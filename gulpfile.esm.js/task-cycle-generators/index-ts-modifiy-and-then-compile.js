import path from 'path'
import through from 'through2'
import typescript from 'typescript'
import changeIndentation from 'indent.js'
import createNewGulpError from 'plugin-error'

import {
    modifyIndexTSContentString,
} from '../helpers/modify-index-ts'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

export function createOneTaskCycleForProcessingTheIndexTS(options) {
    const {
        descriptionOfCoreTask,
        nameOfTheOnlySourceFile,
        sourceFileFolderPath,
        distFolderPath,
        shouldModifyTypeScriptSourceFile,
        shouldCompileTypeScriptIntoJavaScript,
        tsconfig,
    } = options

    let outputFileName

    if (shouldModifyTypeScriptSourceFile) {
        outputFileName = 'compact.ts'
    } else {
        outputFileName = 'index.ts'
    }

    let relativeGlobsOfAllPossibleOutputs
    let outputFolderSubPath

    if (shouldCompileTypeScriptIntoJavaScript) {
        outputFolderSubPath = 'javascript'
        outputFileName = outputFileName.replace(/\.ts$/, '.js')
        relativeGlobsOfAllPossibleOutputs = [
            outputFileName,
            `${outputFileName}.map`,
        ]
    } else {
        outputFolderSubPath = 'typescript'
        relativeGlobsOfAllPossibleOutputs = [ outputFileName ]
    }

    const outputFolderPath = path.posix.join(distFolderPath, outputFolderSubPath)
    // console.log('outputFolderPath', `"${outputFolderPath}"`)

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask: nameOfTheOnlySourceFile,

        sourceGlobs: {
            rootFolderPath: sourceFileFolderPath,
            relativeGlobsSpecificallyForThisTaskCycle: [ nameOfTheOnlySourceFile ],
        },

        outputFiles: {
            rootFolderPath: outputFolderPath,
            forBatchOutputFiles: {
                relativeGlobsOfAllPossibleOutputs,
            },
        },

        firstPipeForProcessingSources: compileTypeScript,

        compressions: {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: true,
            compressor1: null,
            compressor2: null,
        },
    })





    function compileTypeScript() {
        return through.obj(function (file, fileEncoding, callback) {
            if (file.isStream()) {
                return callback(createNewGulpError('Streaming is not supported.'))
            }

            if (file.isNull()) {
                return callback(null, file)
            }

            const typeScriptFileContent = file.contents.toString(fileEncoding || 'utf-8')



            const typeScriptFileContentAsCompilationSource = shouldModifyTypeScriptSourceFile
                ? modifyIndexTSContentString(typeScriptFileContent)
                : typeScriptFileContent

            let outputFileContent = typeScriptFileContentAsCompilationSource



            const sourceFileContainingSubFolderPath = path.relative(
                '.',
                path.posix.dirname(file.path)
            )
            file.path = path.posix.join(outputFolderSubPath, sourceFileContainingSubFolderPath, outputFileName)



            if (shouldCompileTypeScriptIntoJavaScript) {
                const compilationResult = typescript.transpileModule(
                    typeScriptFileContentAsCompilationSource,
                    tsconfig
                )

                outputFileContent = changeIndentation.js(
                    compilationResult.outputText,
                    { tabString: '    ' }
                )
            }

            file.contents = Buffer.from(outputFileContent)

            return callback(null, file)
        })
    }
}

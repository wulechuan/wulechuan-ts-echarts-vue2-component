import path from 'path'
import through from 'through2'
import createNewGulpError from 'plugin-error'

import {
    modifyIndexTSContentString,
} from '../helpers/modify-index-dot-vue'

import {
    transformContentStringOfSingleVueFile,
} from '@wulechuan/vue2-sfc-from-typescript-to-javascript'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'





export function createOneTaskCycleForProcessingTheIndexDotVue(options) {
    const {
        descriptionOfCoreTask,
        nameOfTheOnlySourceFile,
        outputFileNameOfWrapperOnlyVersion,
        sourceFileFolderPath,
        outputFolderPath,
        scriptShouldNotImportEcharts,
        shouldCompileTypeScriptIntoJavaScript,
        extraOptions = {},
    } = options

    let outputFileName
    const {
        vueFileConversionOptions = {},
    } = extraOptions

    if (scriptShouldNotImportEcharts) {
        outputFileName = outputFileNameOfWrapperOnlyVersion
    } else {
        outputFileName = nameOfTheOnlySourceFile
    }

    let outputFolderSubPath

    if (shouldCompileTypeScriptIntoJavaScript) {
        outputFolderSubPath = 'javascript'
    } else {
        outputFolderSubPath = 'typescript'
    }

    const relativeGlobsOfAllPossibleOutputs = [ outputFileName ]





    // https://github.com/wulechuan/wulechuan-js-gulp-4-classical-task-cycle/blob/master/documents/refs/en-US/api-create-a-task-cycle.md

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

        firstPipeForProcessingSources: processTheIndexDotVue,

        compressions: {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: true,
            compressor1: null,
            compressor2: null,
        },
    })





    function processTheIndexDotVue() {
        return through.obj(async function (file, fileEncoding, callback) {
            if (file.isStream()) {
                return callback(createNewGulpError('Streaming is not supported.'))
            }

            if (file.isNull()) {
                return callback(null, file)
            }

            const sourceFileContents = file.contents.toString(fileEncoding || 'utf-8')



            const sourceFileContentsAsCompilationSource = scriptShouldNotImportEcharts
                ? modifyIndexTSContentString(sourceFileContents)
                : sourceFileContents

            let processedVueContents = sourceFileContentsAsCompilationSource



            // const sourceFileContainingSubFolderPath = path.relative(
            //     '.',
            //     path.posix.dirname(file.path)
            // )
            // file.path = path.posix.join(outputFolderSubPath, sourceFileContainingSubFolderPath, outputFileName)

            file.path = outputFileName



            if (shouldCompileTypeScriptIntoJavaScript) {
                processedVueContents = await transformContentStringOfSingleVueFile(
                    sourceFileContentsAsCompilationSource,
                    {
                        ...vueFileConversionOptions,
                        sourceContentDescriptionName: nameOfTheOnlySourceFile,
                    }
                )
            }

            file.contents = Buffer.from(processedVueContents)

            return callback(null, file)
        })
    }
}

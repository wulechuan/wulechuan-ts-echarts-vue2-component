import path from 'path'
import through from 'through2'
import createNewGulpError from 'plugin-error'

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
        outputFileName,
        sourceFileFolderPath,
        outputFolderPath,
        shouldCompileTypeScriptIntoJavaScript,
        extraOptions = {},
    } = options

    const {
        vueFileConversionOptions = {},
    } = extraOptions

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



            let processedVueContents = sourceFileContents
            if (shouldCompileTypeScriptIntoJavaScript) {
                processedVueContents = await transformContentStringOfSingleVueFile(
                    sourceFileContents,
                    {
                        ...vueFileConversionOptions,
                        sourceContentDescriptionName: nameOfTheOnlySourceFile,
                    }
                )
            }



            file.path = path.posix.join(outputFolderPath, outputFileName)
            file.contents = Buffer.from(processedVueContents)



            return callback(null, file)
        })
    }
}

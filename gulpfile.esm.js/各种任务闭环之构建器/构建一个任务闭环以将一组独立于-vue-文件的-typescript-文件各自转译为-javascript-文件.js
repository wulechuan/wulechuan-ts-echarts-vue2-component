import through           from 'through2'
import typescript        from 'typescript'
// import gulpUglifyES      from 'gulp-uglify-es'

import replaceExt        from 'replace-ext'
import changeIndentation from 'indent.js'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

/**
 * @param {object} taskCycleConfig
 * @param {string} taskCycleConfig.descriptionOfCoreTask
 * @param {string} taskCycleConfig.descriptionOfInputsOfCoreTask
 * @param {object} taskCycleConfig.sourceGlobs
 * @param {object} taskCycleConfig.outputFiles
 * @param {object} taskCycleConfig.compressions
 * @param {object} taskCycleConfig.extraOptions
 * @param {string | number} taskCycleConfig.extraOptions.indentation
 * @param {import('typescript').CompilerOptions} taskCycleConfig.extraOptions.tsconfig
 */
export function 构建一个任务闭环用以将一组独立于Vue文件的Typescript文件各自转译成Javascript文件(taskCycleConfig) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
        compressions = {},
        extraOptions = { indentation: 4, tsconfig: null },
    } = taskCycleConfig

    const {
        indentation,
        tsconfig,
    } = extraOptions

    const compressor1 = null
    const compressor2 = null // gulpUglifyES

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,
        firstPipeForProcessingSources: 转译单个Typescript文件,

        compressions: {
            ...compressions,

            compressor1IsEnabled: false,
            compressor1,
            compressorOptions1: null,

            compressor2IsDisabled: false,
            compressor2,
            compressorOptions2: null,
        },
    })

    function 转译单个Typescript文件() {
        return through.obj(async function (file, fileEncoding, callback) {
            if (file.isStream()) {
                return callback(createNewGulpError('Streaming is not supported.'))
            }

            if (file.isNull()) {
                return callback(null, file)
            }

            const sourceTSContentString = file.contents.toString(fileEncoding || 'utf-8')

            file.path = replaceExt(file.path, '.js')

            const {
                outputText: javaScriptCodes,
            } = typescript.transpileModule(
                sourceTSContentString,
                tsconfig
            )
            const processedTSContentString = changeIndentation.js(javaScriptCodes, { tabString: indentation })

            file.contents = Buffer.from(processedTSContentString)

            return callback(null, file)
        })
    }
}

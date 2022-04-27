import postCSS from 'gulp-postcss'
import gulpStylus from 'gulp-stylus'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

import 为PostCss插件构建配置项集
    from '../辅助工具集/为-postcss-构建器配置项集'

/**
 * @param {object} taskCycleConfig
 * @param {string} taskCycleConfig.descriptionOfCoreTask
 * @param {string} taskCycleConfig.descriptionOfInputsOfCoreTask
 * @param {object} taskCycleConfig.sourceGlobs
 * @param {object} taskCycleConfig.outputFiles
 * @param {object} taskCycleConfig.compressions
 * @param {object} taskCycleConfig.extraOptions
 * @param {boolean} taskCycleConfig.extraOptions.shouldDiscardMostCommentsEvenIfNotCompressCSS
 */
export function 构建一个任务闭环用以将一组独立于Vue文件的Stylus文件各自编译成Css文件(taskCycleConfig) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
        compressions = {},

        extraOptions: {
            shouldDiscardMostCommentsEvenIfNotCompressCSS,
        } = {},
    } = taskCycleConfig

    const _shouldDiscardComments = !!shouldDiscardMostCommentsEvenIfNotCompressCSS

    const compressorOptions1 = 为PostCss插件构建配置项集(false, _shouldDiscardComments)
    const compressorOptions2 = 为PostCss插件构建配置项集(true)

    const compressor1 = postCSS
    const compressor2 = postCSS

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,
        firstPipeForProcessingSources: gulpStylus,

        compressions: {
            ...compressions,

            compressor1IsEnabled: _shouldDiscardComments,
            compressor1,
            compressorOptions1,

            compressor2IsDisabled: false,
            compressor2,
            compressorOptions2,
        },
    })
}

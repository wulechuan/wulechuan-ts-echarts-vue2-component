import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

/**
 * @param {object} 配置项集
 * @param {string} 配置项集.descriptionOfCoreTask
 * @param {string} 配置项集.descriptionOfInputsOfCoreTask
 * @param {object} 配置项集.sourceGlobs
 * @param {object} 配置项集.outputFiles
 */
export function 构建一个任务闭环用以复制一组文件或文件夹(配置项集) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
    } = 配置项集

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
    })
}

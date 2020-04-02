import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

export function createOneTaskCycleForCopyingAnyFiles(options) {
    const {
        sourceGlobs,
        sourceGlobs: {
            relativeGlobsSpecificallyForThisTaskCycle,
        },
        outputFiles,
    } = options

    const descriptionOfInputsOfCoreTask = `${relativeGlobsSpecificallyForThisTaskCycle[0]}${
        relativeGlobsSpecificallyForThisTaskCycle.length > 1 ? ' 等' : ''
    }`

    return createATaskCycle({
        descriptionOfCoreTask: `复制 ${descriptionOfInputsOfCoreTask}。`,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,

        compressions: {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: true,
            compressor1: null,
            compressor2: null,
        },
    })
}

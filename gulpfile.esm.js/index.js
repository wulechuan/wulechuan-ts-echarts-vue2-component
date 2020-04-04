import {
    createOneTaskCycleForProcessingTheIndexDotVue,
} from './task-cycle-generators/process-index-dot-vue'

import {
    create3HighOrderTasksUponMultipleTaskCycles,
} from '@wulechuan/gulp-classical-task-cycle'

import tsconfig from '../tsconfig'

const vueFileRelatedTaskCycleExtraOptions = {
    vueFileConversionOptions: {
        indentation: '    ',
        tsconfig,
    },
}

const tcCompileModifiedIndexDotVue = createOneTaskCycleForProcessingTheIndexDotVue({
    descriptionOfCoreTask: '将 index.vue 编译为 JavaScript。',
    nameOfTheOnlySourceFile: 'index.vue',
    sourceFileFolderPath: './source',
    outputFolderPath: 'dist',
    outputFileName: 'index.vue',
    shouldCompileTypeScriptIntoJavaScript: true,
    extraOptions: vueFileRelatedTaskCycleExtraOptions,
})

const {
    // cleanAllOldOuputs,
    buildEverythingOnce,
    watchEverything,
} = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        tcCompileModifiedIndexDotVue,
    ],
})

export const buildOnce     = buildEverythingOnce
export const buildAndWatch = watchEverything
export default buildAndWatch

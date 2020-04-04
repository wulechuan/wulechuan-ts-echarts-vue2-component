import path from 'path'

import {
    createOneTaskCycleForProcessingTheIndexDotVue,
} from './task-cycle-generators/process-index-dot-vue'

import {
    create3HighOrderTasksUponMultipleTaskCycles,
} from '@wulechuan/gulp-classical-task-cycle'



import tsconfig from '../tsconfig'

const joinPathPOSIX = path.posix.join

const sourceFileFolderPath               = '.'
const nameOfTheOnlySourceFile            = 'index.vue'
const outputFileNameOfWrapperOnlyVersion = 'the-wrapper-only.vue'


const outputFileIndentation = '    '

const vueFileRelatedTaskCycleExtraOptions = {
    vueFileConversionOptions: {
        indentation: outputFileIndentation,
        tsconfig,
    },
}

// const tcCopyIndexDotVue = createOneTaskCycleForProcessingTheIndexDotVue({
//     descriptionOfCoreTask: `复制 ${nameOfTheOnlySourceFile}。`,
//     nameOfTheOnlySourceFile,
//     sourceFileFolderPath,
//     outputFolderPath,
//     outputFileNameOfWrapperOnlyVersion,
//     scriptShouldNotImportEcharts: false,
//     shouldCompileTypeScriptIntoJavaScript: false,
// })

const tcCopyModifiedIndexDotVue = createOneTaskCycleForProcessingTheIndexDotVue({
    descriptionOfCoreTask: `先修订 ${nameOfTheOnlySourceFile} 的内容，然后复制到输出文件夹。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    outputFolderPath: '.',
    outputFileNameOfWrapperOnlyVersion,
    scriptShouldNotImportEcharts: true,
    shouldCompileTypeScriptIntoJavaScript: false,
})

const tcCompileIndexDotVue = createOneTaskCycleForProcessingTheIndexDotVue({
    descriptionOfCoreTask: `将 ${nameOfTheOnlySourceFile} 编译为 JavaScript。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    outputFolderPath: 'javascript',
    outputFileNameOfWrapperOnlyVersion,
    scriptShouldNotImportEcharts: false,
    shouldCompileTypeScriptIntoJavaScript: true,
    extraOptions: vueFileRelatedTaskCycleExtraOptions,
})

const tcCompileModifiedIndexDotVue = createOneTaskCycleForProcessingTheIndexDotVue({
    descriptionOfCoreTask: `先修订 ${nameOfTheOnlySourceFile} 的内容，然后将其编译为 JavaScript。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    outputFolderPath: 'javascript',
    outputFileNameOfWrapperOnlyVersion,
    scriptShouldNotImportEcharts: true,
    shouldCompileTypeScriptIntoJavaScript: true,
    extraOptions: vueFileRelatedTaskCycleExtraOptions,
})





const {
    // cleanAllOldOuputs,
    buildEverythingOnce,
    watchEverything,
} = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        // tcCopyIndexDotVue,
        tcCopyModifiedIndexDotVue,
        tcCompileIndexDotVue,
        tcCompileModifiedIndexDotVue,
    ],
})

export const buildOnce     = buildEverythingOnce
export const buildAndWatch = watchEverything
export default buildAndWatch

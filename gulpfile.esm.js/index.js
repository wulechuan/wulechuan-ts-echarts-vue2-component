import path from 'path'

import {
    createOneTaskCycleForProcessingTheIndexTS,
} from './task-cycle-generators/index-ts-modifiy-and-then-compile'

import {
    createOneTaskCycleForCopyingAnyFiles,
} from './task-cycle-generators/any-file-copy'

import {
    create3HighOrderTasksUponMultipleTaskCycles,
} from '@wulechuan/gulp-classical-task-cycle'



import tsconfig from '../tsconfig'

const joinPathPOSIX = path.posix.join

const distFolderPath          = './dist'
const sourceFileFolderPath    = './source'
const nameOfTheOnlySourceFile = 'index.ts'



// https://github.com/wulechuan/wulechuan-js-gulp-4-classical-task-cycle/blob/master/documents/refs/en-US/api-create-a-task-cycle.md

const tcCopyTypeDefinitionsToDistOfTypeScript = createOneTaskCycleForCopyingAnyFiles({
    sourceGlobs: {
        rootFolderPath: joinPathPOSIX(sourceFileFolderPath),
        relativeGlobsSpecificallyForThisTaskCycle: [ '*.d.ts' ],
    },
    outputFiles: {
        rootFolderPath: joinPathPOSIX(distFolderPath, 'typescript'),
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [ '*.d.ts' ],
        },
    },
})

const tcCopyTypeTSConfigJSONToDistOfTypeScript = createOneTaskCycleForCopyingAnyFiles({
    sourceGlobs: {
        rootFolderPath: joinPathPOSIX(sourceFileFolderPath, 'dist-typescript'),
        relativeGlobsSpecificallyForThisTaskCycle: [ 'tsconfig.json' ],
    },
    outputFiles: {
        rootFolderPath: joinPathPOSIX(distFolderPath, 'typescript'),
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [ 'tsconfig.json' ],
        },
    },
})

const tcCopyIndexTS = createOneTaskCycleForProcessingTheIndexTS({
    descriptionOfCoreTask: `复制 ${nameOfTheOnlySourceFile}。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    distFolderPath,
    shouldModifyTypeScriptSourceFile: false,
    shouldCompileTypeScriptIntoJavaScript: false,
})

const tcCopyModifiedIndexTS = createOneTaskCycleForProcessingTheIndexTS({
    descriptionOfCoreTask: `先修订 ${nameOfTheOnlySourceFile} 的内容，然后复制到输出文件夹。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    distFolderPath,
    shouldModifyTypeScriptSourceFile: true,
    shouldCompileTypeScriptIntoJavaScript: false,
})

const tcCompileIndexTS = createOneTaskCycleForProcessingTheIndexTS({
    descriptionOfCoreTask: `将 ${nameOfTheOnlySourceFile} 编译为 JavaScript。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    distFolderPath,
    shouldModifyTypeScriptSourceFile: false,
    shouldCompileTypeScriptIntoJavaScript: true,
    tsconfig,
})

const tcCompileModifiedIndexTS = createOneTaskCycleForProcessingTheIndexTS({
    descriptionOfCoreTask: `先修订 ${nameOfTheOnlySourceFile} 的内容，然后将其编译为 JavaScript。`,
    nameOfTheOnlySourceFile,
    sourceFileFolderPath,
    distFolderPath,
    shouldModifyTypeScriptSourceFile: true,
    shouldCompileTypeScriptIntoJavaScript: true,
    tsconfig,
})



const {
    // cleanAllOldOuputs,
    buildEverythingOnce,
    watchEverything,
} = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        tcCopyTypeDefinitionsToDistOfTypeScript,
        tcCopyTypeTSConfigJSONToDistOfTypeScript,
        tcCopyIndexTS,
        tcCopyModifiedIndexTS,
        tcCompileIndexTS,
        tcCompileModifiedIndexTS,
    ],
})

export const buildOnce     = buildEverythingOnce
export const buildAndWatch = watchEverything
export default buildAndWatch

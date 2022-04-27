import path from 'path'

import {
    构建一个任务闭环用以处理和编译一组Vue文件,
} from './各种任务闭环之构建器/构建一个任务闭环以处理和编译一组-vue-文件'

import {
    构建一个任务闭环用以将一组独立于Vue文件的Typescript文件各自转译成Javascript文件,
} from './各种任务闭环之构建器/构建一个任务闭环以将一组独立于-vue-文件的-typescript-文件各自转译为-javascript-文件'

import {
    构建一个任务闭环用以将一组独立于Vue文件的Stylus文件各自编译成Css文件,
} from './各种任务闭环之构建器/构建一个任务闭环以将一组独立于-vue-文件的-stylus-文件各自编译成-css-文件'

import {
    构建一个任务闭环用以复制一组文件或文件夹,
} from './各种任务闭环之构建器/构建一个任务闭环以将复制一批文件或文件夹'

import {
    create3HighOrderTasksUponMultipleTaskCycles,
} from '@wulechuan/gulp-classical-task-cycle'



import tsconfig from '../tsconfig.json'

const 输出诸文件中采用的缩进形式 = ' '.repeat(4)
const resolvePath = path.resolve





const 任务闭环之处理和编译所有的Vue文件 = 构建一个任务闭环用以处理和编译一组Vue文件({
    descriptionOfCoreTask: '发布所有 .vue 文件的 JavaScript 版本',
    descriptionOfInputsOfCoreTask: '用 TypeScript 写成的 .vue 文件',
    任务相关消息的特征颜色_字之颜色: 'black',
    任务相关消息的特征颜色_底色: 'bgYellow',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/typescript',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.vue',
        ],

        extraSourceGlobsToWatch: [
            './源代码/原始的源代码/typescript/**/*.ts',
        ],
    },

    outputFiles: {
        // https://github.com/wulechuan/wulechuan-js-gulp-4-classical-task-cycle/blob/master/documents/refs/en-US/api-create-a-task-cycle.md

        rootFolderPath: './源代码/发布的源代码/javascript',
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '**/*.vue',
            ],
        },
    },

    extraOptions: {
        vueFileConversionOptions: {
            用于产生的Vue文件中各代码块的单级缩进空白: 输出诸文件中采用的缩进形式,
            tsconfig,

            cssStylus语言的编译配置项集: {
                paths: [
                    resolvePath(__dirname, '../源代码/原始的源代码/stylus'),
                ],
            },

            产生的内容中不应包含任何Style标签: true,
        },
    },
})



const 任务闭环之将所有Vue文件以Typescript加Css的形式到发布到发布文件夹内 = 构建一个任务闭环用以处理和编译一组Vue文件({
    descriptionOfCoreTask: '发布所有 .vue 文件的 TypeScript 版本',
    descriptionOfInputsOfCoreTask: '用 TypeScript 写成的 .vue 文件',
    任务相关消息的特征颜色_字之颜色: 'black',
    任务相关消息的特征颜色_底色: 'bgBlue',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/typescript',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.vue',
        ],

        extraSourceGlobsToWatch: [
            './源代码/原始的源代码/typescript/**/*.ts',
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/typescript',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '**/*.vue',
            ],
        },
    },

    extraOptions: {
        vueFileConversionOptions: {
            用于产生的Vue文件中各代码块的单级缩进空白: 输出诸文件中采用的缩进形式,
            tsconfig,

            cssStylus语言的编译配置项集: {
                paths: [
                    resolvePath(__dirname, '../源代码/原始的源代码/stylus'),
                ],
            },

            产生的内容中不应包含任何Style标签: true,
            不应编译TypeScript: true,
        },
    },
})



const 任务闭环之将所有独立于Vue文件的Typescript文件复制到发布文件夹内 = 构建一个任务闭环用以复制一组文件或文件夹({
    descriptionOfCoreTask: '将所有独立于 .vue 文件的 TypeScript 文件复制到发布文件夹中去',
    descriptionOfInputsOfCoreTask: '.ts 文件',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/typescript',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.ts',
        ],

        extraSourceGlobsToWatch: [
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/typescript',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '**/*.ts',
            ],
        },
    },
})



const 任务闭环之将所有独立于Vue文件的Typescript文件各自转译成Javascript文件 = 构建一个任务闭环用以将一组独立于Vue文件的Typescript文件各自转译成Javascript文件({
    descriptionOfCoreTask: '将所有独立的（即不在 .vue 文件中的）TypeScript 编译为 JavaScript',
    descriptionOfInputsOfCoreTask: '独立的 .ts 文件',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/typescript',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.ts',
        ],

        extraSourceGlobsToWatch: [
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/javascript',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '*.js',
            ],
        },
    },

    extraOptions: {
        indentation: 输出诸文件中采用的缩进形式,
        tsconfig,
    },
})



const 任务闭环之将所有独立于Vue文件的Stylus文件复制到发布文件夹内 = 构建一个任务闭环用以复制一组文件或文件夹({
    descriptionOfCoreTask: '将所有独立于 .vue 文件的 Stylus 文件复制到发布文件夹中去',
    descriptionOfInputsOfCoreTask: '独立的 .styl 文件',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/stylus',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.styl',
        ],

        extraSourceGlobsToWatch: [
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/stylus',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '**/*.styl',
            ],
        },
    },
})



const 任务闭环之将所有Sass文件复制到发布文件夹内 = 构建一个任务闭环用以复制一组文件或文件夹({
    descriptionOfCoreTask: '将所有 Sass 文件复制到发布文件夹中去',
    descriptionOfInputsOfCoreTask: '.scss 文件',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/sass',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.scss',
        ],

        extraSourceGlobsToWatch: [
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/sass',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '**/*.scss',
            ],
        },
    },
})



const 任务闭环之将所有独立于Vue文件的Stylus文件各自编译成Css文件 = 构建一个任务闭环用以将一组独立于Vue文件的Stylus文件各自编译成Css文件({
    descriptionOfCoreTask: '将所有独立的（即不在 .vue 文件中的）Stylus 编译为 CSS',
    descriptionOfInputsOfCoreTask: '独立的 .styl 文件',

    sourceGlobs: {
        rootFolderPath: './源代码/原始的源代码/stylus',

        relativeGlobsSpecificallyForThisTaskCycle: [
            '**/*.styl',
        ],

        extraSourceGlobsToWatch: [
        ],
    },

    outputFiles: {
        rootFolderPath: './源代码/发布的源代码/styles',

        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [
                '*',
            ],
        },

        // forSingleOrTwoOutputFiles: {
        //     fileBaseName: 'default-theme',
        //     fileExtWithoutDot: 'css',
        // },
    },

    compressions: {
        shouldNotOutputUncompressedVersion: false,
        shouldNotOutputCompressedVersion: true,
    },

    // extraOptions: {
    //     shouldDiscardMostCommentsEvenIfNotCompressCSS: false,
    // },
})



const {
    // cleanAllOldOuputs,
    buildEverythingOnce,
    watchEverything,
} = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        任务闭环之将所有Vue文件以Typescript加Css的形式到发布到发布文件夹内,
        任务闭环之将所有独立于Vue文件的Typescript文件复制到发布文件夹内,
        任务闭环之处理和编译所有的Vue文件,
        任务闭环之将所有独立于Vue文件的Typescript文件各自转译成Javascript文件,

        任务闭环之将所有独立于Vue文件的Stylus文件复制到发布文件夹内,
        任务闭环之将所有独立于Vue文件的Stylus文件各自编译成Css文件,
        任务闭环之将所有Sass文件复制到发布文件夹内,
    ],
})

export const buildOnce     = buildEverythingOnce
export const buildAndWatch = watchEverything
export default buildAndWatch

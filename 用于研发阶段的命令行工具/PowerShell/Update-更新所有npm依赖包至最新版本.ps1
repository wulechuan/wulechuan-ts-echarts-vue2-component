#

param(
    [Alias('Delete', 'Remove', '先删')]
    [Switch] $安装之前先删除旧有的_node_modules_文件夹
)





# -------------------------------------------------------
#           删除 node_modules 文件夹
# -------------------------------------------------------

Write-Host

Write-Host  -NoNewline  -F 'Cyan' '===== 删除 '
Write-Host  -NoNewline  -F 'Cyan' 'node_modules'
Write-Host              -F 'Cyan' ' 文件夹 ====================================='

Write-Host

if ($安装之前先删除旧有的_node_modules_文件夹) {
    if (Test-Path '.\node_modules') {
        Remove-Item -Recurse -Force -Path .\node_modules

        if (-not $?) {
            Exit $?
        }

        Write-Host '已删除。'
    } else {
        Write-Host 'node_modules 文件夹并不存在。不必执行。'
    }
} else {
    Write-Host '已略过。 node_modules 文件夹并未删除。'
}





# -------------------------------------------------------
#           删除 package-lock.json 文件
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -NoNewline  -F 'Green' '===== 删除 '
Write-Host  -NoNewline  -F 'Green' 'package-lock.json'
Write-Host              -F 'Green' ' 文件 =================================='

Write-Host

if (Test-Path '.\package-lock.json') {
    Remove-Item -Force -Path .\package-lock.json

    if (-not $?) {
        Exit $?
    }

    Write-Host '已删除。'
} else {
    Write-Host 'package-lock.json 文件并不存在。不必执行。'
}





# -------------------------------------------------------
#           特定版本之【产品依赖包】
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -NoNewline  -F 'DarkRed'                '===== npm i    '
Write-Host  -NoNewline  -F 'White'    -B 'DarkRed'  '特定版本'
Write-Host              -F 'DarkRed'                '之【产品依赖包】 ============================'

Write-Host

Write-Host '暂无。'





# -------------------------------------------------------
#          最末版本之【产品依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -NoNewline  -F 'DarkRed'                '===== npm i    '
Write-Host  -NoNewline  -F 'DarkRed'                '最末版本'
Write-Host              -F 'DarkRed'                '之【产品依赖包】 ============================'

Write-Host

npm  i `
    'lodash.debounce@latest' `
    'resize-detector@latest' `
    'vue-property-decorator@latest'





# -------------------------------------------------------
#           特定版本之【研发依赖包】
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -NoNewline  -F 'DarkGreen'              '===== npm i -D '
Write-Host  -NoNewline  -F 'Black'      -B 'Green'  '特定版本'
Write-Host              -F 'DarkGreen'              '之【研发依赖包】 ============================'

Write-Host

Write-Host '暂无。'





# -------------------------------------------------------
#          最末版本之【研发依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -NoNewline  -F 'DarkGreen'              '===== npm i -D '
Write-Host  -NoNewline  -F 'DarkGreen'              '最末版本'
Write-Host              -F 'DarkGreen'              '之【研发依赖包】 ============================'

Write-Host

npm  i  -D `
    "@types/lodash.debounce" `
    "@typescript-eslint/eslint-plugin@latest" `
    "@typescript-eslint/parser@latest" `
    "@vue/eslint-config-typescript@latest" `
    "@wulechuan/cli-scripts--git-push@latest" `
    "@wulechuan/css-stylus-markdown-themes@latest" `
    "@wulechuan/gulp-classical-task-cycle@latest" `
    "@wulechuan/vue2-sfc-from-typescript-to-javascript@latest" `
    "cssnano@latest" `
    "eslint@latest" `
    "eslint-plugin-vue@latest" `
    "esm@latest" `
    "fs-extra@latest" `
    "gulp-postcss@latest" `
    "gulp-stylus@latest" `
    "gulp-terser@latest" `
    "plugin-error@latest" `
    "rimraf@latest" `
    "stylus@latest" `
    "through2@latest" `
    "typescript@latest"





# -------------------------------------------------------
#           更新与研发相关的数据库
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
#     例如： Browserslist:caniuse-lite
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -F 'DarkYellow'  '===== 更新与研发相关的数据库 ======================================='

Write-Host
Write-Host

npx  browserslist@latest  --update-db





# -------------------------------------------------------
#           其他交代
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

Write-Host  -F 'Blue'        '===== 其他交代 ====================================================='

Write-Host

Write-Host  '暂无。'





# -------------------------------------------------------
#           结束
# -------------------------------------------------------

Write-Host
Write-Host
Write-Host
Write-Host
Write-Host

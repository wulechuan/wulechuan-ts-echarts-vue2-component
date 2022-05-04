#

# -------------------------------------------------------
#           特定版本之【产品依赖包】
# -------------------------------------------------------

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

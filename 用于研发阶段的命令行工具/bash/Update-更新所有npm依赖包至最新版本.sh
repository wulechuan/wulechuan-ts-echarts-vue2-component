#!/bin/sh

# -------------------------------------------------------
#           特定版本之【产品依赖包】
# -------------------------------------------------------

echo

echo  -e  "\e[0;31m===== npm i    \e[97;41m特定版本\e[0;31m之【产品依赖包】 ============================\e[0;0m"

echo

echo '暂无。'





# -------------------------------------------------------
#          最末版本之【产品依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[0;31m===== npm i    最末版本之【产品依赖包】 ============================\e[0;0m"

echo

npm  i \
    'lodash.debounce@latest' \
    'resize-detector@latest' \
    'vue-property-decorator@latest'





# -------------------------------------------------------
#           特定版本之【研发依赖包】
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[32m===== npm i    \e[90;102m特定版本\e[0;32m之【研发依赖包】 ============================\e[0;0m"

echo

echo '暂无。'





# -------------------------------------------------------
#          最末版本之【研发依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[32m===== npm i    最末版本之【研发依赖包】 ============================\e[0;0m"

echo

npm  i  -D \
    "@types/lodash.debounce" \
    "@typescript-eslint/eslint-plugin@latest" \
    "@typescript-eslint/parser@latest" \
    "@vue/eslint-config-typescript@latest" \
    "@wulechuan/cli-scripts--git-push@latest" \
    "@wulechuan/css-stylus-markdown-themes@latest" \
    "@wulechuan/gulp-classical-task-cycle@latest" \
    "@wulechuan/vue2-sfc-from-typescript-to-javascript@latest" \
    "cssnano@latest" \
    "eslint@latest" \
    "eslint-plugin-vue@latest" \
    "esm@latest" \
    "fs-extra@latest" \
    "gulp-postcss@latest" \
    "gulp-stylus@latest" \
    "gulp-teaser@latest" \
    "plugin-error@latest" \
    "rimraf@latest" \
    "stylus@latest" \
    "through2@latest" \
    "typescript@latest"





# -------------------------------------------------------
#           更新与研发相关的数据库
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
#     例如： Browserslist:caniuse-lite
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[33m===== 更新与研发相关的数据库 =======================================\e[0;0m"

echo
echo

npx  browserslist@latest  --update-db





# -------------------------------------------------------
#           其他交代
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  '\e[94m===== 其他交代 =====================================================\e[0;0m'

echo

echo  '暂无。'





# -------------------------------------------------------
#           结束
# -------------------------------------------------------

echo
echo
echo
echo
echo

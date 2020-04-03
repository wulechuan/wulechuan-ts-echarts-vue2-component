export function modifyIndexTSContentString(originalFileContentString) {
    return originalFileContentString.replace(
        /import\s+echartsDefaultCreator\s+from\s*['"]echarts['"]/,
        'const echartsDefaultCreator = undefined'
    )
}

export function modifyIndexTSContentString(originalFileContentString) {
    return originalFileContentString.replace(
        /import\s+echarts\s+from\s*['"]echarts['"]/,
        'import echarts from \'echarts/lib/echarts\''
    )
}

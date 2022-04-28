export type 范_文本列表查重_统计辅助字典 = {
    [文本: string]: number
}

export type 范_文本列表查重_统计结果字典 = {
    统计结果: 范_文本列表查重_统计辅助字典;
    错误消息文本片断集: string[];
}

export function 文本列表查重 (待观察之列表?: string[]): false | 范_文本列表查重_统计结果字典 {
    const 统计辅助字典: 范_文本列表查重_统计辅助字典 = {}
    if (!Array.isArray(待观察之列表)) { return false }

    let 发现了重复条目: boolean = false
    待观察之列表.forEach((文本, 列表编号) => {
        if (typeof 文本 !== 'string') {
            throw new TypeError(`文本列表查重() 只能处理条目全部为字符串（string）类型的列表。而给出的列表的第[${列表编号}]项的类型是“${typeof 文本}”。`)
        }

        if (!统计辅助字典[文本]) {
            统计辅助字典[文本] = 1
        } else {
            发现了重复条目 = true
            统计辅助字典[文本]++
        }
    })

    if (!发现了重复条目) { return false }



    const 重复之条目之字典: 范_文本列表查重_统计结果字典 = {
        统计结果: {},
        错误消息文本片断集: [],
    }

    Object.keys(统计辅助字典).forEach(文本 => {
        const 出现的次数: number = 统计辅助字典[文本]
        if (出现的次数 > 1) {
            重复之条目之字典.统计结果[文本] = 出现的次数
            重复之条目之字典.错误消息文本片断集.push(`"${文本}" 出现 ${出现的次数} 次。`)
        }
    })

    return 重复之条目之字典
}

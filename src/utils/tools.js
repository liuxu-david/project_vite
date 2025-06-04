// 根据设计稿上的px，计算出当前设备真实适配的 px 值
/**
 * @param px 设计稿的px值
 * @param isFormat 是否返回带px单位的字符串，默认true
 * @param designWidth 设计稿的宽度，默认750px，根据实际情况修改
 * @returns 适配后的px值
 * */
export const pxValueToPx= (px = 375, isFormat = true, designWidth = 750) => {
    // 基准设计稿宽度（通常为 750px）
    const _designWidth = designWidth;
    // 获取当前设备的屏幕宽度
    const windowWidth= uni.getSystemInfoSync().windowWidth;
    // 计算缩放比例
    const scale = windowWidth / _designWidth;
    // 返回自适应后的 px 值
    return isFormat ? `${px * scale}px` : px * scale;
}
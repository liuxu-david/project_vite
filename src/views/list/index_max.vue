<!-- 不定高的虚拟滚动 -->
<script setup>
import { computed, onMounted, reactive, ref, onBeforeUnmount } from "vue";

// 初始化后端返回的数据
const commonChars = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严';
// 生成随机文字的函数
function generateRandomText() {
    // 随机生成0-100之间的字数
    const wordCount = Math.floor(Math.random() * 100);
    let result = '';
    for (let i = 0; i < wordCount; i++) {
        // 随机选择汉字
        const randomIndex = Math.floor(Math.random() * commonChars.length);
        result += commonChars[randomIndex];
    }

    return { text: result, count: wordCount };
}
const data = [];
for (let i = 1; i <= 200; i++) {
    data.push({ id: i, content: generateRandomText().text });
}

// 数据定义
const listRef = ref(null); //用于获取可视区域高度
let scrollTop = ref(0); //滚动高度
let viewHeight = ref(0); //可视区域的高度
let startIndex = ref(0); //起始索引
const defaultHeight = 30; // 起始状态给个默认高度,还没测量的时候就是这个高度
const itemHeights = reactive([]); //记录每一项的计算出的高度
const preHeight = 100; //预留100px,防止白屏

// 记录每一项的起始位置（最后一项可以用作总滚动盒子的高度）(这里比返回的数据多一项，因为记录了最后一项的下一个的起始位置)
const handleItemStartHeights = computed(()=>{
    const arr = [0];
    for (let i = 0; i < data.length; i++) {
       arr[i + 1] = arr[i] + (itemHeights[i] || defaultHeight);
    }
    return arr;
})
// 可见区域需要渲染的列表
const handleListResult = computed(() => {
    const res = [];
    let totalHeight = 0; //可视区展示条数的总高度
    let i = startIndex.value;
    while(i< data.length && totalHeight < viewHeight.value + preHeight) {
        res.push({ ...data[i], index: i });
        totalHeight += itemHeights[i] || defaultHeight;
        i++;
    }
    return res;
});
// 生命周期钩子，获取可是区域高度
onMounted(() => {
    viewHeight.value = listRef.value.offsetHeight; //可视区域高度
});
// 滚动处理（根据滚动距离查找当前可见区域的起始索引）
const handleListScroll = () => {
    scrollTop.value = listRef.value.scrollTop;
    startIndex.value = findStartIndex(scrollTop.value);
};
// 查找起始索引(可优化，通过二分进行查找，效率更高)
const findStartIndex = (scrollTop) => {
    const targetIndex = handleItemStartHeights.value.findIndex((item) => item > scrollTop)
    return targetIndex === -1 ? handleItemStartHeights.value.length -1 : targetIndex - 1;
}
// 优化（性能更好，并且计算更准确）
// const observers = new Map();
// const observeItem = (el, index) =>{
//     if(!el) return;
//     if (observers.has(index)) {
//         observers.get(index).disconnect();
//     }
//     const observer = new ResizeObserver((entries) => {
//         for (const entry of entries) {
//         requestAnimationFrame(() => {
//             for (const entry of entries) {
//             const idx = entry.target.dataset.index;
//             if (idx != null) {
//                 itemHeights[idx] = entry.contentRect.height;
//             }
//             }
//         });
//         }
//     })
//     observer.observe(el);
//     observers.set(index, observer);
// }
// // 组件卸载时，断开所有 observer
// onBeforeUnmount(() => {
//   observers.forEach((observer) => observer.disconnect());
//   observers.clear();
// });
</script>

<template>
    <div class="list" ref="listRef" @scroll="handleListScroll">
        <div :style="{ height: handleItemStartHeights[handleItemStartHeights.length - 1] + 'px' }">
            <div :style="{
                transform: `translateY(${handleItemStartHeights[startIndex]}px)`,
            }">
                <div class="list_item" v-for="item in handleListResult" :key="item.id" :ref="(el) => el && (itemHeights[item.index] = el.offsetHeight)">
                    {{ item.content }}{{ item.id }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.list {
    width: 300px;
    height: 500px;
    border: 1px solid red;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }

    .list_item {
        height: auto;
        width: 300px;
        box-sizing: border-box;
        border: 1px solid green;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

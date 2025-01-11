import { ElMessage } from "element-plus";

export default {
    // 实现一键copy的功能
    mounted(el, binding) {
        const contentText = binding.value || el.innerText;
        // 创建处理复制的函数
        const handleCopy = () => {
            // 根据Clipboard API 进行复制
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(contentText)
                    .then(() => {
                        ElMessage.success("复制成功");
                    })
                    .catch(() => {
                        ElMessage.error("复制失败");
                    });
            } else {
                // 如果不支持Clipboard API，则使用document.execCommand('copy')方法
                const textAreaEl = document.createElement("textarea");
                textAreaEl.value = contentText;
                document.body.appendChild(textAreaEl);
                textAreaEl.select();
                document.execCommand("copy"); //执行复制
                document.removeChild(textAreaEl); //移除临时节点
                ElMessage.success("复制成功");
            }
        };
        // 绑定点击事件
        el._handelCopy = handleCopy;
        el.addEventListener("click", el._handelCopy);
    },
    unmounted(el) {
        // 防止内存泄露，卸载事件的监听
        el.removeEventListener("click", el._handelCopy);
    },
};

import CustomToastMax from "./CustomToastMax.vue";
import { createApp } from "vue";

interface Options {
    message:string //提示文字
    duration?:number //弹窗关闭间隔时间
    actionText?: string //操作按钮文字
    onAction?: ()=>void //操作按钮执行的回调
}

let currentToast: any = null; //处理弹窗短时间多次调用
export const showToast = (options:Options) => {
    if(currentToast) currentToast(); //如果上次的还存在，则清除上次的定时器
    const { message,duration = 2000,actionText,onAction } = options
    // 创建一个弹窗组件
    const component = createApp(CustomToastMax,{
        message,
        duration,
        actionText,
        onAction: ()=>{
            onAction?.();
            close();
        },
    });
    // 挂载到div节点
    const divEl = document.createElement('div')
    component.mount(divEl)
    // 添加到页面
    document.body.append(divEl);
    // 添加关闭函数
    let timer: any = null;
    const close = ()=>{
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        // 卸载移除
        component.unmount();
        divEl.remove();
    }
    // 自动执行关闭函数
    timer = setTimeout(close, duration);
    // 将此次的关闭函数赋值给变量
    currentToast = close;
    // 返回close，可在外面控制关闭
    return close;
}
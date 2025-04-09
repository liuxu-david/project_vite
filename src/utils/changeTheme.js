// export const changeTheme = (theme) => {
//     const themeVars = {
//         light: {
//             "--background-color": "skyblue",
//             "--btn-color": "red",
//         },
//         dark: {
//             "--background-color": "#cccccc",
//             "--btn-color": "green",
//         },
//     };
//     const vars = themeVars[theme];
//     console.log("🚀 ~ changeTheme ~ vars:", vars);
//     if (!vars) return;
//     Object.keys(vars).forEach((key) => {
//         document.documentElement.style.setProperty(key, vars[key]);
//     });
// };

// 动态切换类的方式
export const changeTheme = (theme) => {
    const themeVars = {
        light: 'theme-light',
        dark: 'theme-dark'
        }
    const themeName = themeVars[theme];
    console.log("🚀 ~ changeTheme ~ vars:", themeName);
    if (!themeName) return;
    document.documentElement.className = themeName;
};


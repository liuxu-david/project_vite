import less from "less";
export const changeTheme = (theme) => {
    const themeVars = {
        light: {
            "--background-color": "skyblue",
            "--btn-color": "red",
        },
        dark: {
            "--background-color": "#cccccc",
            "--btn-color": "green",
        },
    };
    const vars = themeVars[theme];
    console.log("🚀 ~ changeTheme ~ vars:", vars);
    if (!vars) return;
    Object.keys(vars).forEach((key) => {
        document.documentElement.style.setProperty(key, vars[key]);
    });
};

const initThemeState = {
    isDark: JSON.parse(localStorage.getItem("theme")) || false,
};

const ThemeReducer = (state = initThemeState, action) => {
    switch (action.type) {
        case "SWITCH_THEME":
            const newTheme = !state.isDark;
            localStorage.setItem("theme", JSON.stringify(newTheme));
            return { ...state, isDark: newTheme };
        default:
            return state;
    }
};

export default ThemeReducer;

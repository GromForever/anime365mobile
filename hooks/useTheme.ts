import { useContext } from 'react';
import {ThemeContext} from "../common/ThemeProvider";
import {ThemeContextType} from "../common/ThemeProvider"

export const useTheme = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return themeContext as ThemeContextType;
};
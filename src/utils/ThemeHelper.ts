/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITheme, getTheme } from '@fluentui/react';

const ThemeState = (<any>window).__themeState__;

/**
 * Gets the Theme Colour for a given slot from SharePoint
 * @description
 * This function retrieves the theme color for a given slot from SharePoint.
 * @param {string} slot - The slot name for which the theme color is to be retrieved.
 * @returns {any} - The RGB color value for the specified slot.
 */
export function getThemeColor(slot: string): any {
    if (ThemeState && ThemeState.theme && ThemeState.theme[slot]) {
        return ThemeState.theme[slot];
    }

    const theme = getTheme();
    return theme[slot as keyof ITheme];
}
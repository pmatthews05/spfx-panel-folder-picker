import { getFocusStyle, IProcessedStyleSet, ITheme, mergeStyleSets } from "@fluentui/react";

/**
 * Generates styles for the panel component.
 * @description
 * This function generates styles for the panel component using Fluent UI's mergeStyleSets and getFocusStyle.
 * It returns a processed style set that can be used in the component.
 * 
 * This was created as to keep the different panels looking consistent across the app.
 * @param {ITheme} theme - The Fluent UI theme object.
 * @returns {IProcessedStyleSet} - The processed style set for the panel component.
 */
export function generatePanelStyles(theme: ITheme): IProcessedStyleSet<{
  container: {};
  itemCell: {};
  itemImage: {};
  itemContent: {};
  itemName: {};
  itemIndex: {};
  itemDocImage: {};
  itemLink: {};
}>{
  return mergeStyleSets({
    container: {
      overflow: "auto",
      maxHeight: "500",
    },
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        minHeight: 40,
        padding: 5,
        boxSizing: "border-box",
        borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
        display: "flex",
        sectors: {
          "&:hover": { background: theme.palette.neutralLight },
        },
      },
    ],
    itemImage: {
      flexShrink: 0,
    },
    itemDocImage: {
      flexShrink: 0,
      displayMode: "inline-flex",
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 5,
      alignItems: "center",
    },
    itemLink: {
      displayMode: "inline-flex",
      padding: 5,
      alignItems: "center",
    },
    itemContent: {
      marginLeft: 10,
      overflow: "hidden",
      flexGrow: 1,
    },
    itemName: [
      theme.fonts.medium,
      {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    ],

    itemIndex: {
      fontSize: theme.fonts.small.fontSize,
      color: theme.palette.neutralTertiary,
      marginBottom: 0,
    },
  });
}

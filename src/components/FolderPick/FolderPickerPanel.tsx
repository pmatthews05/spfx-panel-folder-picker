import * as React from "react";
import { IFolderProps } from "./IFolderProps";
import { useState, useEffect } from "react";
import { DefaultButton, MessageBar, MessageBarType } from "@fluentui/react";
import StatefulPanel from "../StatefulPanel/StatefulPanel";
import FolderPickerCollection from "./FolderPickerCollection";

const FolderPickerPanel: React.FC<IFolderProps> = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(null);
  const [itemCount, setItemCount] = useState<number>(0);
  const [statusTxt, setStatusTxt] = React.useState<string>(null);
  const [statusType, setStatusType] = React.useState<MessageBarType>(null);

  /**
   * This effect initializes the item count based on the selected rows passed in props.
   * It sets the itemCount state to the length of selectedRows.
   * @returns {void}
   */
  useEffect(() => {
    setItemCount(props.selectedRows.length);
  }, []);

  /**
   * This effect sets the title of the panel based on the number of selected items.
   * If there are multiple items selected, it sets a generic title.
   * If only one item is selected, it sets the title to the FileRef of that item.
   * @returns {void}
   */
  useEffect(() => {
    if (itemCount > 1) {
      setTitle(`Select a folder for ${itemCount} items`);
    } else {
      setTitle(
        `Select a folder for ${props.selectedRows[0].getValueByName("FileRef")}`
      );
    }
  }, [itemCount]);

 /**
  * This function is a fallback error handler for the component.
  * It is used to catch errors that occur during rendering or lifecycle methods.
  * It returns a MessageBar component displaying the error message.
  */
  const _errorFallBack = (
    error: Error,
    info: { componentStack: string }
  ): JSX.Element => {
   
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={true}
        dismissButtonAriaLabel="Close"
      >
        {error}
      </MessageBar>
    );
  };

  /**
   * This function is called when the panel is dismissed.
   * It checks if the onDismiss callback is defined in the panelConfig,
   * and if so, it calls that callback.
   * It then sets the isPanelOpen state to false,
   * effectively closing the panel.
   * @returns {void}
   */
  const onPanelDismissed = (): void => {
    if (props.panelConfig.onDismiss !== undefined) {
      props.panelConfig.onDismiss();
    }
    setIsPanelOpen(false);
  };

  /**
   * This function renders the footer content of the panel.
   * It returns a DefaultButton component that,
   * when clicked, calls the onPanelDismissed function to close the panel.
   * @returns {JSX.Element} The footer content of the panel.
   */
  const onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <DefaultButton
          onClick={onPanelDismissed}
          text="Close"
        ></DefaultButton>
      </div>
    );
  };

   return (
        <StatefulPanel
          title={title}
          panelTop={props.panelConfig.panelTop}
          onDismiss={onPanelDismissed}
          isOpen={isPanelOpen}
          onRenderFooterContent={onRenderFooterContent}
          isFooterAtBottom={true}
        >
          {statusTxt && (
            <MessageBar
              messageBarType={statusType}
              isMultiline={true}
              dismissButtonAriaLabel="x"
              onDismiss={() => setStatusTxt(null)}
            >
              {statusTxt}
            </MessageBar>
          )}
          <FolderPickerCollection
            selectedRows={props.selectedRows}
            listName={props.listName}
            listRootFolder={props.listRootFolder}
            context={props.context}
            ></FolderPickerCollection>
        </StatefulPanel>
  );
};

export default FolderPickerPanel;
import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IFolderPickerCollectionProps } from "./IFolderPickerCollectionProps";
import { generatePanelStyles } from "../../utils";

import {
  ImageFit,
  Image,
  ProgressIndicator,
  List,
  PrimaryButton,
  Stack,
  useTheme,
  Link,
  MessageBarType,
  MessageBar,
  TextField,
} from "@fluentui/react";
import { IFolder, FolderPicker } from "@pnp/spfx-controls-react/lib/FolderPicker";

const FolderPickerCollection: React.FC<IFolderPickerCollectionProps> = (
  props
) => {
  const [processCollection, setProcessCollection] = useState<any[]>([]);
  const theme = useTheme();
  const classNames = useMemo(() => generatePanelStyles(theme), [theme]);
  const [messageBarText, setMessageBarText] = useState<string>(null);
  const [messageBarType, setMessageBarType] = useState<MessageBarType>(null);
  const [getFolderName, setFolderName] = useState<string>(null);
  const [getFolderServerRelativeUrl, setFolderServerRelativeUrl] = useState<string>(null);

  const initializeProcessCollection = (): void => {
    const processItems = props.selectedRows
      .map((item) => ({
        id: item.getValueByName("ID"),
        fileRef: item.getValueByName("FileRef"),
      }))
      .sort((a, b) => a.id - b.id);
    setProcessCollection(processItems);
  };

  /**
   * Called when the component mounts.
   * @description
   * This effect runs when the component mounts. It sets the icon themes and initializes the process collection.
   */
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      initializeProcessCollection();
    };

    initialize().catch((error) => {});
  }, []);

  const onSelectFolder = useCallback(
    (folder: IFolder): void => {
      setFolderName(folder.Name);
      setFolderServerRelativeUrl(folder.ServerRelativeUrl);
    },
    [getFolderName]
  );

  const onRenderCells = useCallback(
    (process: any): JSX.Element => {
      return (
        <div data-is-focusable={true}>
          <Image
            className={classNames.itemImage}
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20240610.001/assets/item-types/20/listitem.svg"
            alt="item"
            width={50}
            height={50}
            imageFit={ImageFit.cover}
          />
          <div className={classNames.itemContent}>
            <div className={classNames.itemName}>{process.fileRef}</div>
            <div className={classNames.itemIndex}>{process.id}</div>
            <ProgressIndicator percentComplete={0 / 5} />
          </div>
        </div>
      );
    },
    [classNames]
  );

  return (
    <React.Fragment>
      <Stack tokens={{ childrenGap: 10 }}>
        <MessageBar
          messageBarType={messageBarType}
          style={{ minHeight: 25 }}
          isMultiline={true}
        >
          <span dangerouslySetInnerHTML={{ __html: messageBarText }} />
        </MessageBar>
        <FolderPicker
          context={props.context}
          label="Select Folder"
          required={true}
          rootFolder={{
            Name: props.listName, 
            ServerRelativeUrl: props.listRootFolder
          }}
          onSelect={onSelectFolder}
          canCreateFolders={true}
        />
        <TextField label="Text" value={getFolderName} readOnly />

        <PrimaryButton
          text="Copy"
          iconProps={{ iconName: "Copy" }}
        ></PrimaryButton>
        <div className={classNames.container} data-is-scrollable>
          <List items={processCollection} onRenderCell={onRenderCells} />
        </div>
      </Stack>
    </React.Fragment>
  );
};

export default FolderPickerCollection;

import { ListViewCommandSetContext, RowAccessor } from "@microsoft/sp-listview-extensibility";
import { IStatefulPanelProps } from "../StatefulPanel/IStatefulPanelProps";

/**
 * IFolderProps interface defines the properties for the FolderPickerPanel component.
 * It includes the selected rows, list name, list root folder, context, optional completion callback,
 * and panel configuration.
 */
export interface IFolderProps {
    selectedRows: readonly RowAccessor[];
    listName: string;
    listRootFolder: string;
    context: ListViewCommandSetContext
    onCompleted?: (success:boolean) => void;
    panelConfig: IStatefulPanelProps
}
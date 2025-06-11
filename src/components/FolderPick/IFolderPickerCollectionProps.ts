

import { ListViewCommandSetContext } from '@microsoft/sp-listview-extensibility';
import { RowAccessor } from '@microsoft/sp-listview-extensibility';


export interface IFolderPickerCollectionProps {
    selectedRows: readonly RowAccessor[];
    listName: string;
    listRootFolder: string;
    context: ListViewCommandSetContext
}
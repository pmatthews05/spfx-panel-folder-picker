import * as ReactDOM from "react-dom";
import * as React from "react";
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';

import { override } from "@microsoft/decorators";
import { IFolderProps } from "../../components/FolderPick/IFolderProps";
import FolderPickerPanel from "../../components/FolderPick/FolderPickerPanel";
export interface IFolderpickerCommandSetProperties {

}

const LOG_SOURCE: string = 'FolderpickerCommandSet';
export default class FolderpickerCommandSet extends BaseListViewCommandSet<IFolderpickerCommandSetProperties> {
  private panelPlaceHolder: HTMLDivElement;
  private panelTop: number;
  private panelId: string;

  private folderControlId: string;

  @override
  public async onInit(): Promise<void> {
    await super.onInit();

    /**
     * Set the panel position and placeholder for the application. It will be used to display the citation, batch and clone panels.
     * @returns {void}
     */
    const _setPanel = (): void => {
      this.panelTop = document.querySelector("#SuiteNavWrapper").clientHeight;
      this.panelPlaceHolder = document.body.appendChild(document.createElement("div"));
    };

    _setPanel();
    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);
  }


  /**
   * This function is called when the ListView state changes.
   * It checks if there are any selected rows in the ListView and updates the visibility of the commands accordingly.
   * @param {ListViewStateChangedEventArgs} args - The event arguments containing the new state of the ListView.
   * @returns {void}
   */
  public _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    const itemSelected = this.context.listView.selectedRows && this.context.listView.selectedRows.length > 0;

    const control1Command: Command = this.tryGetCommand('COMMAND_1');
    if (control1Command && control1Command.visible !== itemSelected) {
      control1Command.visible = itemSelected;
    }

    this.raiseOnChange();
  }


  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {

    /**
    * This sets up the Folder Picker panel. It creates a new ID for the panel, sets the ID of the placeholder,
    * and renders the component.
    */
    const _showfolderPickerPanel = (props: IFolderProps): void => {
      this.panelId = Date.now().toString();
      this.panelPlaceHolder.setAttribute("id", this.panelId);
      const element: React.ReactElement<IFolderProps> = React.createElement(FolderPickerPanel, {
        ...props,
        key: this.panelId
      });
      ReactDOM.render(element, this.panelPlaceHolder);
    }


    /**
     * This function is called when the panel is dismissed. It will refresh the page if the refreshPage parameter is set to true.
     * @param {boolean} refreshPage - If true, the page will be refreshed on the dismissal of the panel..
     * @returns {void}
     */
    const _dismissPanel = (refreshPage: boolean = false): void => {
      if (refreshPage) {
        location.reload();
      }
    };


    const _onComplete = (success: boolean): void => { }

    switch (event.itemId) {
      case 'COMMAND_1':
        _showfolderPickerPanel({
          panelConfig: {
            title: "Folder Picker",
            panelTop: this.panelTop,
            onDismiss: () => _dismissPanel(),
          },
          listName: this.context.listView.list.title,
          listRootFolder: this.context.listView.list.serverRelativeUrl,
          context: this.context,
          selectedRows: event.selectedRows,
          onCompleted: _onComplete
        });
        break;
      default:
        throw new Error(`Unknown command: ${event.itemId}`);
    }
  }


  /**
  * This function is called when the component is disposed. It unmounts the component from the DOM and removes the placeholder.
  * @returns {void}
  */
  public onDispose(): void {
    if (this.panelPlaceHolder) {
      ReactDOM.unmountComponentAtNode(this.panelPlaceHolder);
      document.body.removeChild(this.panelPlaceHolder);
    }
    super.onDispose();
  }
}
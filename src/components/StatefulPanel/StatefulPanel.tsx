import { IPanelStyles, Panel, PanelType } from "@fluentui/react";
import {loadStyles} from "@microsoft/load-themed-styles";
import * as React from "react";
import { IStatefulPanelProps } from "./IStatefulPanelProps"
import { useState } from "react";

/**
 * StatefulPanel component is a wrapper around the Fluent UI Panel component.
 * It manages the open/close state of the panel and applies custom styles.
 * @param {IStatefulPanelProps} props - The properties for the StatefulPanel component.
 * @returns {JSX.Element} The rendered StatefulPanel component.
 */
const StatefulPanel : React.FC<IStatefulPanelProps> = (props) => {
 
    const IframePanelStyles: Partial<IPanelStyles> = {
		root: { top: props.panelTop },
	};
    const [isPanelOpen, setIsPanelOpen] = useState(props.isOpen);

    React.useEffect(() => {
        loadStyles("panel");
    }, []);

    React.useEffect(() => {
        setIsPanelOpen(props.isOpen);
    }, [props.isOpen]);

    const _onPanelClosed = (): void => {
        setIsPanelOpen(false);

        if(props.onDismiss !== undefined) {
            props.onDismiss();
        }
    };

    return (
        <Panel className="od-Panel"
         onRenderFooterContent={props.onRenderFooterContent} 
         headerText={props.title} 
         isFooterAtBottom={props.isFooterAtBottom}
         isOpen={isPanelOpen}
         type={PanelType.medium} 
         isLightDismiss={false} 
         styles={IframePanelStyles}
         onDismiss={_onPanelClosed}>
            {/* Ensure there are children to render, otherwise ErrorBoundary throws error */}
			{props.children && <>{props.children}</>}
        </Panel>
    );
}

export default StatefulPanel;
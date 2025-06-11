import { IPanelProps } from '@fluentui/react';

/**
 * IStatefulPanelProps interface defines the properties for the StatefulPanel component.
 * It extends the IPanelProps interface from Fluent UI and adds a panelTop property.
 */
export interface IStatefulPanelProps extends IPanelProps {
    panelTop: number;
}
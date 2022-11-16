import { ReactNode } from "react";
import { ControlPanelContextType } from "./ControlPanelContextType";

export type ControlPanelProps = {
    children: ReactNode;
    value: ControlPanelContextType
};
import { ReactNode } from "react";
import { GlobalContextType } from "./GlobalContextType";

export type GlobalProps = {
    children: ReactNode;
    value: GlobalContextType
};

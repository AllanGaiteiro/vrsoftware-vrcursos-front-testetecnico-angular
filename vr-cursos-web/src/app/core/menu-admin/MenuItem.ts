import { MenuChildren } from "./MenuChildren";


export interface MenuItem {
    state: string;
    name: string;
    type: string;
    icon?: string;
    children?: MenuChildren[];
}

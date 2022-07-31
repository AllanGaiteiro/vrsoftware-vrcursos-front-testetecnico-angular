import { Injectable } from "@angular/core";
import { MENU_ADMIN } from "./menu-admin";
import { MenuItem } from "./MenuItem";


@Injectable()
export class Menu {
    getMenu(): MenuItem[] {
        return MENU_ADMIN;
    }
}

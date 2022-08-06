import { MenuChildren } from "./MenuChildren";
import { MenuItem } from "./MenuItem";

const MENU_BASIC: MenuChildren[] = [
    { state: 'listar', name: 'Listar', type: 'link', icon: 'search' },
    { state: 'criar', name: 'Criar', type: 'link', icon: 'add_circle_outline' }
]

export const MENU_ADMIN: MenuItem[] = [
    { state: 'alunos', type: 'link', name: 'Alunos', icon: 'person', children: MENU_BASIC },
    { state: 'cursos', type: 'link', name: 'Cursos', icon: 'bookmark', children: MENU_BASIC },
    { state: 'matriculations', type: 'link', name: 'Matriculas', icon: 'how_to_reg', children: MENU_BASIC }
]


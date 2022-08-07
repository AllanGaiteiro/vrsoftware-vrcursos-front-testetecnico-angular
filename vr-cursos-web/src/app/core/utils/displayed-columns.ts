import { DisplayedColumns } from "../models/common/DisplayedColumns";

const DISPLAYED_COLUMNS_COURSE: DisplayedColumns[] = [
    { name: 'id', value: "Codigo", length: 3 },
    { name: 'description', value: "Descrição", length: 7 },
    { name: 'actions', value: 'Ação', length: 2 }
];
const DISPLAYED_COLUMNS_STUDENT: DisplayedColumns[] = [
    { name: 'id', value: "Codigo", length: 3 },
    { name: 'name', value: "Nome", length: 7 },
    { name: 'actions', value: 'Ação', length: 2 }
];
const DISPLAYED_COLUMNS_MATRICULATION: DisplayedColumns[] = [
    { name: 'id', value: "Codigo", length: 3 },
    { name: 'course', value: "Cursos", length: 4 },
    { name: 'student', value: 'Aluno', length: 5 }
];

export const DISPLAYED_COLUMNS = {
    COURSE: DISPLAYED_COLUMNS_COURSE,
    STUDENT: DISPLAYED_COLUMNS_STUDENT,
    MATRICULATION: DISPLAYED_COLUMNS_MATRICULATION
}



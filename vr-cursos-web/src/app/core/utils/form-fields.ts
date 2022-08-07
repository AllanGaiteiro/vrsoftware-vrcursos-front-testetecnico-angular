import { FormField } from "../models/common/FormField";

const FORM_FIELD_COURSE: FormField[] = [
    { name: 'description', value: 'Descrição', type: 'input' },
    { name: 'menu', value: 'Ementa', type: 'textarea' }
];
const FORM_FIELD_STUDENT: FormField[] = [
    { name: 'name', value: 'Nome', type: 'input' }
];

export const FORM_FIELD = {
    COURSE: FORM_FIELD_COURSE,
    STUDENT: FORM_FIELD_STUDENT,
    //MATRICULATION: FORM_FIELD_MATRICULATION
}



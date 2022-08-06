export class CourseEntity {
    public id: number;
    public description: string;
    public menu: string;

    constructor() {
        this.id = 0;
        this.description = '';
        this.menu = '';
    }
}
import { Lesson } from "./lesson";

export class Course {
    constructor(

        public title: string,
        public description: string,
        public id: number,
        public teacherId: number,
        public showLessons?: boolean,
        public lessons?: Lesson[]

    ) { }
}
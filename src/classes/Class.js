export default class Class {
    courseId;
    id;
    title;
    daysAndTimes;
    instructors

    constructor(courseId, id, title, daysAndTimes, instructors) {
        this.courseId = courseId;
        this.id = id;
        this.title = title;
        this.daysAndTimes = daysAndTimes;
        this.instructors = instructors;
    }
}
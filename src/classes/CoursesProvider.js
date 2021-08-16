import Course from "./Course";
import Class from "./Class";
import {getMockCourses} from "../MockCourses";

export class CoursesProvider {
    static getCourses(mockData, callback) {
        if (mockData) {
            callback(getMockCourses());
        } else {
            CoursesProvider.grabCoursesFromDom(callback)
        }
    }

    static grabCoursesFromDom = (callback) => {
        window.chrome.runtime.onMessage.addListener(function proccessDom(msg) {
            if (msg.from === "background.js" && msg.to === "builder" && msg.subject === "append-dom") {
                window.chrome.runtime.onMessage.removeListener(proccessDom);
                const dom = new DOMParser().parseFromString(msg.content, "text/html");
                let courses = CoursesProvider.mapDomToCourses(dom);
                console.log(courses);
                callback(courses);
            }
        });
    }

    static mapDomToCourses = (dom) => {
        const coursesDom = dom.querySelectorAll("[id*='divSSR_CLSRSLT_WRK_GROUPBOX2$']");
        let id = -1;
        return Array.from(coursesDom).map(courseDom => {
            const courseName = courseDom.querySelector("div[id*='divSSR_CLSRSLT_WRK_GROUPBOX2GP$']")
                                        .innerText
                                        .trim()
                                        .replace("  ", " ");
            const courseId = courseName.split(" - ")[0];
            let course = new Course(courseId, courseName, []);
            const classesDom = courseDom.querySelectorAll("[id^='trSSR_CLSRCH_MTG1$']");
            course.classes = Array.from(classesDom).map(classDom => {
                const section = classDom.children[1].innerText.trim().replace(/[\n]/, " ");
                const daysAndTimes = classDom.children[2].innerText.trim().split(/[\n]/);
                id += 1;
                return new Class(courseId, id, section, daysAndTimes);
            })
            return course;
        });
    }
}
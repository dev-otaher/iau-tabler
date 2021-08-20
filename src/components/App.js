import React from "react";
import {HashRouter, Route, Switch} from 'react-router-dom';
import CreateGroup from "./CreateGroup";
import {Container, Header} from "semantic-ui-react";
import TableList from "./TableList";
import {CoursesProvider} from "../classes/CoursesProvider";
import Group from "../classes/Group";
import {ReactComponent as Logo} from "../icons/logo.svg";
import InfoMenu from "./InfoMenu";

class App extends React.Component {
    state = {uuid: 1};
    courses = [];
    classes = [];
    groups = [new Group(1, "Group 1", [])];

    componentDidMount() {
        CoursesProvider.getCourses(true, courses => this.handleCourses(courses));
    }

    //region handleCourses
    handleCourses(courses) {
        this.courses = courses;
        this.classes = this.getClassesFromCourses(courses);
        this.classes.forEach(c => {
            c.courseTitle = this.getCourseById(c.courseId).title;
        })
        this.rerender();
    }

    getClassesFromCourses(courses) {
        return courses.map(course => course.classes).flat();
    }

    getCourseById = (id) => {
        return this.courses.filter(course => course.id === id)[0];
    }

    //endregion

    rerender() {
        let newUUID = this.state.uuid + 1;
        this.setState({uuid: newUUID})
    }

    render() {
        return (
            <>
                <Container>
                    <Header>
                        <Logo/>
                    </Header>
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact>
                                <CreateGroup courses={this.courses} classes={this.classes}
                                             groups={this.groups}/>
                            </Route>
                            <Route path="/tables" exact>
                                <TableList groups={this.groups}/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Container>
                <InfoMenu/>
            </>
        );
    }
}

export default App;
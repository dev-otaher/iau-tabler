import React from "react";
import {Switch, Route, BrowserRouter, HashRouter} from 'react-router-dom';
import CreateGroup from "./CreateGroup";

import {Container} from "semantic-ui-react";
import TableList from "./TableList";

class App extends React.Component {
    render() {
        return (
            <Container>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact component={CreateGroup}/>
                        <Route path="/tables" exact component={TableList}/>
                    </Switch>
                </HashRouter>
            </Container>
        );
    }
}

export default App;
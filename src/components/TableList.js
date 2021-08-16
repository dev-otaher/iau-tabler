import React from "react";
import {Button, Icon} from "semantic-ui-react";
import Table from "./Table";
import {Link} from "react-router-dom";

class TableList extends React.Component {

    render() {
        const {groups} = this.props;
        return (
            <>
                <Link to="/">
                    <Button primary>
                        <Button.Content><Icon name='arrow left'/></Button.Content>
                    </Button>
                </Link>
                <Table groups={groups}/>
            </>
        );
    }

}

export default TableList;

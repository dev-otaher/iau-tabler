import React from "react";
import {Button} from "semantic-ui-react";

const AnimatedButton = (props) => {
    return (
        <Button  onClick={props.onClick} {...props}>

        </Button>
    )
}

export default AnimatedButton;
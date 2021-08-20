import React from "react";
import {Icon, Menu} from "semantic-ui-react";
import styled from "styled-components";
import {ReactComponent as BMC} from "../icons/bmc.svg";

const StyledMenu = styled(Menu)`
  position: fixed;
  top: 45%;
  right: 0;
`

class InfoMenu extends React.Component {
    render() {
        return (
            <StyledMenu vertical floated={"right"} icon borderless>
                <StyledMenu.Item as="a" href="https://www.linkedin.com/in/omar-ahmed-032a93216/" target="_blank"
                                 rel="noreferrer">
                    <Icon name="linkedin" size={"big"} color={"blue"}/>
                </StyledMenu.Item>
                <StyledMenu.Item as="a" href="https://www.buymeacoffee.com/dev.omar.ahmed" target="_blank"
                                 rel="noreferrer">
                    <BMC/>
                </StyledMenu.Item>
            </StyledMenu>
        );
    }
}

export default InfoMenu;
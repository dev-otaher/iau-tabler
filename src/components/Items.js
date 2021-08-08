import React from "react";
import Item from "./Item";

class Items extends React.Component {
    state = {activeIndex: -1};

    onTitleClick = (index) => {
        if (index === this.state.activeIndex)
            this.setState({activeIndex: null});
        else
            this.setState({activeIndex: index});
    }

    render() {
        return (
            this.props.items.map(({title, classes}, index) => {
                const active = index === this.state.activeIndex;
                // if (index === 0)
                return <Item key={index}
                             title={title}
                             classes={classes}
                             isActive={active}
                             allowedDestination={this.props.allowedDestination}
                             onClick={() => {
                                 this.onTitleClick(index)
                             }}/>
            })
        )
    }
}

export default Items;
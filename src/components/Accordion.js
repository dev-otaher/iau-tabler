import React from "react";

class Accordion extends React.Component {
    render() {
        return (
            <div className="eight wide column">
                <div className="ui styled accordion">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Accordion;
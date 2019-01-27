import React from 'react';

class Sign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            classNames: props.classNames
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onSignClicked(this.state.value);
    };

    render() {
        return (
            <button onClick={this.handleClick}
                    className={this.props.classNames}>{this.props.children || this.state.value}</button>
        );
    }
}

export default Sign;

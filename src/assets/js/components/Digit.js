import React from 'react';

class Digit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            classNames: props.classNames
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onDigitChanged(this.state.value)
    };

    render() {
        return (
            <button onClick={this.handleClick}
                    className={this.state.classNames}>{this.state.value || this.props.children}</button>
        );
    }
}

export default Digit;

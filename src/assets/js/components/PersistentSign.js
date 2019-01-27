import React from 'react';
import Sign from './Sign';

class PersistentSign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            classNames: props.classNames,
            active: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onSignClicked(this);
    };

    render() {
        let classes = "col vertical-sign";

        if (this.state.active){
            classes = `${classes} active`;
        }

        return (
            <Sign onSignClicked={this.handleClick} value={this.state.value} classNames={classes}/>
        );
    }
}

export default PersistentSign;

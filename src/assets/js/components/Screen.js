import React from 'react';

class Screen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
    }

    render() {
        return (
            <div className="screen">
                {this.props.value}
            </div>
        );
    }
}

export default Screen;

import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from "./components/Calculator";

class App extends React.Component {

    onDigitChanged = (digitValue) => {
        console.log(digitValue);
    };

    render() {
        return (
            <Calculator/>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('calculator'));
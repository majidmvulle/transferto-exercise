import React from 'react';
import Screen from './Screen';
import Digit from "./Digit";
import Decimal from "./Decimal";
import Sign from "./Sign";
import PersistentSign from "./PersistentSign";

class Calculator extends React.Component {
    isEnteringFirstValue = true;
    isEnteringSecondValue = false;
    activePersistentSign = null;

    constructor(props) {
        super(props);
        this.state = {
            firstValue: 0,
            secondValue: 0,
            screenValue: 0,
        };

        this.handleDigitChanged = this.handleDigitChanged.bind(this);
        this.handleDecimalChanged = this.handleDecimalChanged.bind(this);
        this.handleSignClicked = this.handleSignClicked.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    handleDigitChanged = (newDigitValue) => {
        if (this.isEnteringFirstValue){
            let firstValue = this.state.firstValue;

            if (firstValue === 0) {
                firstValue = newDigitValue;
            } else {
                firstValue = `${firstValue}${newDigitValue}`;
            }

            this.setState({firstValue: firstValue, screenValue: firstValue});
        }else{
            let secondValue = this.state.secondValue;

            if (secondValue === 0) {
                secondValue = newDigitValue;
            } else {
                secondValue = `${secondValue}${newDigitValue}`;
            }

            this.setState({secondValue: secondValue, screenValue: secondValue});
        }
    };

    handleDecimalChanged = () => {
        if (this.isEnteringFirstValue){
            if (this.state.firstValue % 1 === 0){
                const firstValue = `${this.state.firstValue}.`;
                this.setState({firstValue: firstValue, screenValue: firstValue});
            }
        }else{
            if (this.state.secondValue % 1 === 0) {
                const secondValue = `${this.state.secondValue}.`;
                this.setState({secondValue: secondValue, screenValue: secondValue});
            }
        }
    };

    handleEqualsClicked = () => {
        if (!this.activePersistentSign){
            return;
        }

        this.handleSignClicked(this.activePersistentSign.state.value);
    };

    handleSignClicked = (sign) => {
        switch(sign){
            case '√': //square root
                this.calculate('/api/square_root', {
                    firstValue: this.state.firstValue
                });
                break;
            case '∛': //cubic root
                this.calculate('/api/cubic_root', {
                    firstValue: this.state.firstValue
                });
                break;
            case 'x^y': //power
                this.calculate('/api/power', {
                    firstValue: this.state.firstValue,
                    secondValue: this.state.secondValue
                });
                break;
            case 'x!': //factorial
                this.calculate('/api/factorial', {
                    firstValue: this.state.firstValue
                });

                break;
            case 'C':
                if (this.activePersistentSign){
                    this.activePersistentSign.setState({active: false});
                    this.activePersistentSign = null;
                }
                this.setState({screenValue: 0, firstValue: 0, secondValue: 0});
                break;
            case '+-':
                alert('to be implemented');
                break;
            case '%':
                this.calculate('/api/percentage', {
                    firstValue: this.state.firstValue,
                });
                break;
            case '÷': //division
                this.calculate('/api/division', {
                    firstValue: this.state.firstValue,
                    secondValue: this.state.secondValue
                });
                break;
            case '×': //multiplication
                this.calculate('/api/multiplication', {
                    firstValue: this.state.firstValue,
                    secondValue: this.state.secondValue
                });
                break;

            case '+': //addition
                this.calculate('/api/addition', {
                    firstValue: this.state.firstValue,
                    secondValue: this.state.secondValue
                });
                break;
            case '-': //subtraction
                this.calculate('/api/subtraction', {
                    firstValue: this.state.firstValue,
                    secondValue: this.state.secondValue
                });
                break;
        }
    };

    calculate = (url, data, callback) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then((data) => {
                this.doResult(data.result, callback);
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    };

    doResult = (result, callback) => {
        if (this.activePersistentSign){
            this.activePersistentSign.setState({active: false});
            this.activePersistentSign = null;
        }

        this.setState({screenValue: result, firstValue: result, secondValue: 0}, () => {
            if (callback){
                callback(result);
            }
        });
    };

    handlePersistentSignClicked = (component) => {
        if (this.activePersistentSign){
            this.activePersistentSign.setState({active: false});

            if (this.state.firstValue && this.state.secondValue){
                component.setState({active: true});
                component.state.active = true;
            }else{
                if (component.state.value === this.activePersistentSign.state.value) {
                    component.setState({active: !component.state.active});
                    component.state.active = !component.state.active;
                }
            }
        }else{
            component.setState({active: true});
            component.state.active = true;
        }

        this.activePersistentSign = component;
        this.isEnteringSecondValue = this.activePersistentSign.state.active;
        this.isEnteringFirstValue = !this.activePersistentSign.state.active;
    };


    render() {
        return (
            <div className="w-100">
                <Screen value={this.state.screenValue}/>
                <div className="container">
                    <div className="row digits">
                        <Sign onSignClicked={this.handleSignClicked} value="&#8730;" classNames="col horizontal-sign"/>
                        <Sign onSignClicked={this.handleSignClicked} value="&#8731;" classNames="col horizontal-sign"/>
                            <PersistentSign onSignClicked={this.handlePersistentSignClicked} value="x^y"
                                            classNames="col horizontal-sign"/>
                        <Sign onSignClicked={this.handleSignClicked} value="x!" classNames="col vertical-sign"/>
                    </div>
                    <div className="row digits">
                        <Sign onSignClicked={this.handleSignClicked} value="C" classNames="col horizontal-sign"/>
                        <Sign onSignClicked={this.handleSignClicked} value="+-" classNames="col horizontal-sign">
                            +<sub>/</sub><sub> -</sub>
                        </Sign>
                        <Sign onSignClicked={this.handleSignClicked} value="%" classNames="col horizontal-sign"/>
                        <PersistentSign onSignClicked={this.handlePersistentSignClicked} value="&#247;" classNames="col vertical-sign"/>
                    </div>
                    <div className="row digits">
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="7"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="8"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="9"/>
                        <PersistentSign onSignClicked={this.handlePersistentSignClicked} value="&#215;" classNames="col vertical-sign"/>
                    </div>
                    <div className="row digits">
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="4"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="5"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="6"/>
                        <PersistentSign onSignClicked={this.handlePersistentSignClicked} value="-" classNames="col vertical-sign"/>
                    </div>
                    <div className="row digits">
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="1"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="2"/>
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col" value="3"/>
                        <PersistentSign onSignClicked={this.handlePersistentSignClicked} value="+" classNames="col vertical-sign"/>
                    </div>
                    <div className="row digits">
                        <Digit onDigitChanged={this.handleDigitChanged} classNames="col-6" value="0"/>
                        <Decimal onDecimalChanged={this.handleDecimalChanged} classNames="col-3" value="."/>
                        <Sign onSignClicked={this.handleEqualsClicked} value="=" classNames="col-3 vertical-sign"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;

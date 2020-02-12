import React from "react";
import "../style/search.css";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            allValues: props.values,
            possibleValues: props.values,
            type: props.type,
            selectedValue: props.selectType === "Multi" ? [] : '',
            showAvailableOption: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.values && prevProps.values && this.props.values.length !== prevProps.values.length) {
            this.setState({
                allValues: this.props.values,
                possibleValues: this.props.values,
            })
        }
    }

    onTextChange = (event) => {
        this.setState({ textValue: event.target.value });
        this.updatePossibleValues();
    }

    onFocus = () => {
        this.setState({ showAvailableOption: true });
    }

    onFocusOut = () => {
        //  this.setState({ showAvailableOption: false });
    }

    updatePossibleValues = () => {
        const { textValue, possibleValues } = this.state;
        const filteredValues = 
            possibleValues.filter(value => value.indexOf(textValue)>-1);
        this.setState({possibleValues: filteredValues});
    }

    showOptions = () => {
        const possibleValues = this.state.possibleValues;
        if (possibleValues.length >= 0) {
            return possibleValues.map((value, index) => {
                return (<li key={index}>{value}</li>);
            })
        } else {
            return '';
        }
    }

    render() {
        const classes = `search-box ${this.props.className}`;
        const { showAvailableOption } = this.state;

        return (
            <div className={classes}>
                <input type="text" value={this.state.textValue}
                    onFocus={this.onFocus}
                    onChange={this.onTextChange}
                    onBlur={this.onFocusOut}
                />
                {showAvailableOption &&
                    <ul>
                        {this.showOptions()}
                    </ul>
                }
            </div>
        );
    }
}

export default Search; 
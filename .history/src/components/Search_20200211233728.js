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
        this.onSelect = this.onSelect.bind(this);
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
        // batch call
        this.setState({ textValue: event.target.value });
        this.updatePossibleValues(event.target.value);
    }

    onFocus = () => {
        this.setState({ showAvailableOption: true });
    }

    onFocusOut = () => {
        //  this.setState({ showAvailableOption: false });
    }

    onSelect = () => {

     }

    updatePossibleValues = (textValue) => {
        const { allValues } = this.state;

        const filteredValues =
            allValues.filter(value => value.toLowerCase().indexOf(textValue.toLowerCase()) > -1);
        this.setState({ possibleValues: filteredValues });
    }

    showOptions = () => {
        const possibleValues = this.state.possibleValues;
        if (possibleValues.length >= 0) {
            return possibleValues.map((value, index) => {
                return (<li key={index} onClick={(value) => { this.onSelect(value) }}>
                    {value}
                </li>);
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
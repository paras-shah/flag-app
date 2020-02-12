import React from "react";
import "../style/search.css";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            allValues: props.values,
            possibleValues: props.values,
            multiSelect: props.multiSelect ? true : false,
            selectedValue: props.multiSelect ? [] : '',
            showAvailableOption: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidUpdate(prevProps) {

        if (this.props.values && prevProps.values && this.props.values[0] !== prevProps.values[0]) {
            this.setState({
                allValues: this.props.values,
                possibleValues: this.props.values,
            })
        }
        if (this.props.selectType && prevProps.selectType && this.props.selectType !== prevProps.selectType) {
            this.setState({
                selectType: this.props.selectType
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
        // this.setState({ showAvailableOption: false });
    }

    onSelect = (selectedValue) => {
        const { allValues } = this.state;
        const selectedValueIndex = allValues.indexOf(selectedValue);
        this.setState({ selectedValue: selectedValueIndex, showAvailableOption: false });
        this.props.onSelect(selectedValueIndex);
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
                return (<li key={index} onClick={() => { this.onSelect(value) }}>
                    {value}
                </li>);
            })
        } else {
            return '';
        }
    }

    render() {
        const { showAvailableOption, multiSelect } = this.state;

        const classes = `search-box ${this.props.className} ${(multiSelect?'multi-select':'')}`;
        
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
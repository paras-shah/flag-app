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
        if(props.multiSelect)
            console.log(this.props.checkedValues, prevProps.checkedValues);

        if (this.props.checkedValues && prevProps.checkedValues && this.props.checkedValues.length !== prevProps.checkedValues.length) {
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
        // this.setState({ showAvailableOption: false });
    }

    onSelect = (checkBoxValue) => {
        const { allValues, multiSelect, selectedValue } = this.state;
        const selectedValueIndex = allValues.indexOf(checkBoxValue);
        
        if (multiSelect) {
            const existAt = selectedValue.indexOf(selectedValueIndex);
            if (existAt >= 0) {
                selectedValue.splice(existAt, 1)
            } else {
                // remove it from selected values
                selectedValue.push(selectedValueIndex);
            }
            this.setState({ selectedValue: selectedValue });
            this.props.onSelect(selectedValue);
        }
        else {
            this.setState({ selectedValue: selectedValueIndex, showAvailableOption: false });
            this.props.onSelect(selectedValueIndex);
        }
    }


    updatePossibleValues = (textValue) => {
        const { allValues } = this.state;

        const filteredValues =
            allValues.filter(value => value.toLowerCase().indexOf(textValue.toLowerCase()) > -1);
        this.setState({ possibleValues: filteredValues });
    }


    showOptions = () => {
        const { possibleValues, multiSelect, allValues } = this.state;
        if (possibleValues.length >= 0) {
            if (multiSelect) {
                return possibleValues.map((value, index) => {
                    const getIndex = allValues.indexOf(value);
                    return (<li key={getIndex} >
                        <input onClick={(e) => { this.onSelect(value, e) }} type="checkbox" name="country" aria-label={value} id={`country${index}`} />
                        <label htmlFor={`country${index}`}>{value}</label>
                    </li>);
                })
            }
            else {
                return possibleValues.map((value, index) => {
                    return (<li key={index} onClick={() => { this.onSelect(value) }}>
                        {value}
                    </li>);
                })
            }

        } else {
            return '';
        }
    }

    render() {
        const { showAvailableOption, multiSelect } = this.state;
        const classes = `search-box ${this.props.className} ${(multiSelect ? 'multi-select' : '')}`;

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
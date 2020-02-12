import React from "react";
import PropTypes from 'prop-types';

import "../style/search.css";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '', // To control text box 
            allValues: props.values, // Saving initial state of options  
            possibleValues: props.values, // To save options related to text
            multiSelect: props.multiSelect ? true : false, // Provides option to user to select more than one option
            selectedValue: props.multiSelect ? props.checkedValues : '',// Selected values in options 
            showAvailableOption: false, // Available option list 
            activePossibleValuesIndex: -1 // Currently focussed available option 
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidUpdate(prevProps) {
        /* To update comps in these two conditions
            - When Continent changes 
            - When user clear flags button  */
        if ((this.props.values && prevProps.values
            && this.props.values[0] !== prevProps.values[0]) ||
            (this.props.checkedValues
                && prevProps.checkedValues
                && this.props.checkedValues.length === 0
                && this.props.checkedValues.length !== prevProps.checkedValues.length)) {
            this.setState({
                textValue: '',
                allValues: this.props.values,
                possibleValues: this.props.values,
                selectedValue: this.props.multiSelect ? this.props.checkedValues : '',
                showAvailableOption: false,
                activePossibleValuesIndex: -1
            });
        }
    }

    /*
        On search text change - to update type-ahead options 
    */
    onTextChange = (event) => {
        // batch call
        this.setState({ textValue: event.target.value });
        this.updatePossibleValues(event.target.value);
    }

    /* To return possible values based default options and text value
    */
    updatePossibleValues = (textValue) => {
        const { allValues } = this.state;

        const filteredValues =
            allValues.filter(value => value.toLowerCase().indexOf(textValue.toLowerCase()) > -1);
        this.setState({ possibleValues: filteredValues });
    }

    /*
        On search text focus  - to show type-ahead options 
    */
    onFocus = () => {
        this.setState({ showAvailableOption: true });
    }

    /*
        On search text blur  - to reset currently focussed item to -1  
    */
    onFocusOut = () => {
        this.setState({ activePossibleValuesIndex: -1 });
    }

    /*
        On selecting an option - based on value we get its index in default options 
        single select - update selected value and close options
        multi select -  If already in selected values - remove it 
                        If not adding it
        Then calling parent component on select props to update its state 
    */
    onSelect = (checkBoxValue, event) => {
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
            this.props.onSelection(selectedValue);
        }
        else {
            this.setState({ selectedValue: selectedValueIndex, showAvailableOption: false });
            this.props.onSelection(selectedValueIndex);
        }
    }

    /* Navigating available options on key strokes - once user focus on it
    */
    onKeyDown = (e) => {
        const { possibleValues, activePossibleValuesIndex } = this.state;
        const maxIndexOfCurrentOptionShown = possibleValues.length - 1;
        if (e.keyCode === 13) {
            if (activePossibleValuesIndex > -1) {
                this.onSelect(possibleValues[activePossibleValuesIndex]);
            }
        }
        else if (e.keyCode === 38) {
            // Up Key press 
            this.setState({
                activePossibleValuesIndex: (activePossibleValuesIndex > 0) ? activePossibleValuesIndex - 1 : 0
            });
        }
        else if (e.keyCode === 40) {
            // Down 
            this.setState({
                activePossibleValuesIndex: (activePossibleValuesIndex < maxIndexOfCurrentOptionShown) ? activePossibleValuesIndex + 1 : maxIndexOfCurrentOptionShown
            });
        }
    }

    /* Display available options only 
        and List options only, currently focused element will stand out with focused class    
        single select - 
        multi select -  list with checkbox  
            allValues contains default options , while possibleValues is dynamic 
            To check checked status -  we get the default index based on value and check if its in selected array,      
    */
    showOptions = () => {
        const { possibleValues, multiSelect, allValues, selectedValue, activePossibleValuesIndex } = this.state;
        if (possibleValues.length >= 0) {
            if (multiSelect) {
                return possibleValues.map((value, index) => {
                    const getIndex = allValues.indexOf(value);/* this index is everything */
                    const isSelected = selectedValue.indexOf(getIndex) > -1 ? true : false;
                    const keyFocusOn = activePossibleValuesIndex === index ? 'focused' : '';

                    return (<li key={getIndex} className={`${keyFocusOn} ${isSelected ? 'checked' : ''}`}>
                        <input checked={isSelected} onChange={(e) => {
                            this.onSelect(value, e)
                        }} type="checkbox" name="country" aria-label={value} id={`country${index}`} />
                        <label htmlFor={`country${index}`}>{value}</label>
                    </li>);
                })
            }
            else {
                return possibleValues.map((value, index) => {
                    const keyFocusOn = activePossibleValuesIndex === index ? 'focused' : '';

                    return (<li key={index} onClick={() => { this.onSelect(value) }} className={`${keyFocusOn}`}>
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
                    onKeyDown={this.onKeyDown}
                    aria-label={this.props.label}
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

Search.propTypes = {
    values: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool,
    checkedValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    className: PropTypes.string,
    label: PropTypes.string,
};

export default Search;


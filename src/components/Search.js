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
            selectedValue: props.multiSelect ? props.checkedValues : '',
            showAvailableOption: false,
            activePossibleValuesIndex: -1
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidUpdate(prevProps) {

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

    onTextChange = (event) => {
        // batch call
        this.setState({ textValue: event.target.value });
        this.updatePossibleValues(event.target.value);
    }

    onFocus = () => {
        this.setState({ showAvailableOption: true });
    }

    onFocusOut = () => {
        this.setState({ activePossibleValuesIndex: -1 });
    }

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
            this.props.onSelect(selectedValue);
        }
        else {
            this.setState({ selectedValue: selectedValueIndex, showAvailableOption: false });
            this.props.onSelect(selectedValueIndex);
        }
    }

    onKeyDown = (e) => {
        const { possibleValues, activePossibleValuesIndex } = this.state;
        const maxIndexOfCurrentOptionShown = possibleValues.length - 1;
        if (e.keyCode === 13) {
            if (activePossibleValuesIndex > -1) {
                this.onSelect(possibleValues[activePossibleValuesIndex]);
                this.setState({
                    activePossibleValuesIndex: -1
                });
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


    updatePossibleValues = (textValue) => {
        const { allValues } = this.state;

        const filteredValues =
            allValues.filter(value => value.toLowerCase().indexOf(textValue.toLowerCase()) > -1);
        this.setState({ possibleValues: filteredValues });
    }


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
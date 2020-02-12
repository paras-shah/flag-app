import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
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

    componentDidUpdate(props, prevProps) {
        console.log(props, prevProps)
        if (props.values && prevProps.values && props.values.length !== prevProps.values.length) {
            this.setState({
                allValues: props.values,
                possibleValues: props.values,
            })
        }
    }


    onTextChange = (event) => {
        this.setState({ textValue: event.target.value });
    }

    onFocus = () => {
        this.setState({ showAvailableOption: true });
    }

    onFocusOut = () => {
        this.setState({ showAvailableOption: false });
    }

    showOptions = () => {
        debugger;
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
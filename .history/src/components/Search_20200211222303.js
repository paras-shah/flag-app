import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textValue: '',
            allValues: props.possibleValues,
            possibleValuesBasedOnText: props.possibleValues,
            type: props.type,
            selectedValue: props.selectType === "Multi" ? [] : ''
        }

        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange = (event) => {
        this.setState({ textValue: event.target.value });
    }


    render() {
        const classes = `search-box ${this.props.className}`;
        return (
            <div className={classes}>
                <input type="text" value={this.state.textValue}
                    onChange={this.onTextChange} />
            </div>
        );
    }
}

export default Search; 
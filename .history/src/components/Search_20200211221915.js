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
        this.setState({ value: event.target.value });
    }


    render() {
        const className = `search-box ${props}`
        return (<div className="search-box">
            <input type="text" value={this.state.value}
                onChange={this.onTextChange} />
        </div>)
    }
}

export default Search; 
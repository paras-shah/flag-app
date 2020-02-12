import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textValue: '',
            possibleValues: props.possibleValues,
            type: props.type,
            selectedValue: props.selectType === "Multi"? []: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        this.setState({ value: event.target.value });
    }


    render() {
        return <input type="text" value={this.state.value} onChange={this.onChange} />
    }
}

export default Search; 
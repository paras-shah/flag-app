import React from 'react';

// Components 

// Config
import COPY from "./config/copy";
import data from "./config/continents.json";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    }
  }

  componentDidMount(){
    console.log(data);
  }


  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1>{COPY.HEADER_TEXT}</h1>
          <h2>{COPY.HEADER_SUBTEXT} <span> {COPY.HEADER_SUBTEXT} </span></h2>
        </header>

        <div className="app-content">
        </div>
      </div>
    );
  }
}

export default App;

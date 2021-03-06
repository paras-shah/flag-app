import React from 'react';

// Components 
import Search from "./components/Search";

// Config
import COPY from "./config/copy";
import data from "./config/continents.json";


class App extends React {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
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
          <Search />
        </div>
      </div>
    );
  }
}

export default App;

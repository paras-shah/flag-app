import React from 'react';

// Components 
import Search from "./components/Search";

// Config
import COPY from "./config/copy";


class App extends React {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
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

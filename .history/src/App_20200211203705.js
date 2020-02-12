import React from 'react';

// Config
import COPY from "./config/copy";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>{COPY.HEADER_TEXT}</h1>
        <h2>{COPY.HEADER_SUBTEXT} <span> {COPY.HEADER_SUBTEXT} </span></h2>
      </header>  
    </div>
  );
}

export default App;

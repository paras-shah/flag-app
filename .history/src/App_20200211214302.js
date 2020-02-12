import React from 'react';

// Components 
import Search from "./components/Search";

// Config
import COPY from "./config/copy";
import data from "./config/continents.json";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagData: null,
      selectedContinent: null,
      selectedCountry: [],
    }
  }

  componentDidMount() {
    this.setState({ flagData: data });
  }


  render() {
    return (
      <main className="app-main">
        <header className="app-header">
          <h1 className="mainText">{COPY.HEADER_TEXT}</h1>
          <h2 className="subText">{COPY.HEADER_SUBTEXT} <span> {COPY.HEADER_SUBTEXT_TWO} </span></h2>
        </header>

        <div className="app-content">
          {/* Continent */}
          <section className="column">
            <Search />
          </section>

          {/* Country */}
          <section className="column">
            <Search />
          </section>

          {/* Flag Column */}
          <section className="column">

          </section>

        </div>
      </main>
    );
  }
}

export default App;

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
      selectedContinent: false,
      selectedCountry: false,
    }
  }

  componentDidMount() {
    this.setState({ flagData: data });
  }


  render() {
    const { selectedContinent } = this.state;

    return (
      <main className="app-main">
        <header className="app-header">
          <h1 className="main-text">{COPY.HEADER_TEXT}</h1>
          <h2 className="sub-text">{COPY.HEADER_SUBTEXT} <span> {COPY.HEADER_SUBTEXT_TWO} </span></h2>
        </header>

        <div className="app-content">
          {/* Continent */}
          <section className="column">
            <h2 className="main-text">{COPY.COLUMN_ONE_HEADING}</h2>
            <h3 className="column-sub-text">{COPY.COLUMN_ONE_SUBTEXT} </h3>

            <Search allValues={this.state.data} type="SingleSelect"  className="conti-select" />
          </section>

          {/* Country */}
          {selectedContinent &&
            <section className="column">
              <h2 className="main-text">{COPY.COLUMN_TWO_HEADING}</h2>
              <h3 className="column-sub-text">{COPY.COLUMN_TWO_SUBTEXT} </h3>
              <Search />
            </section>
          }

          {/* Flag Column */}
          <section className="column">

          </section>

        </div>
      </main>
    );
  }
}

export default App;

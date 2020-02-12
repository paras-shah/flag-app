import React from 'react';

// Components 
import Search from "./components/Search";

// Config
import COPY from "./config/copy";
import flagData from "./config/continents.json";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      continentData: [],
      selectedContinentCountryData: [],

      selectedContinentIndex: -1,
      selectedCountry: false,
    }
  }

  componentDidMount() {
    if (flagData) {
      const continentArray = this.getContinent();
      this.setState({ ...this.state, continentData: continentArray });
    }
  }

  // 
  getContinent = () => {
    return flagData.map((value) => {
      return value["continent"];
    });
  }

  // on
  onContinentChange = (selectedValueIndex) => {
    this.setState({ selectedContinentIndex: selectedValueIndex });
  }

  render() {
    const { continentData, selectedContinentIndex } = this.state;
    const selectedContinent = selectedContinentIndex>-1?continentData[selectedContinentIndex]:false;

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

            <Search values={this.state.continentData}
              type="SingleSelect"
              className="continent-select"
              onSelect={this.onContinentChange}
            />

            {selectedContinentIndex > -1 &&
              <>
                <p className="column-sub-text">
                  {COPY.SELECTED}
                </p>
                <p className="main-text">
                  {continentData[selectedContinentIndex]}
                </p>
              </>
            }
            <>

            </section>

            {/* Country */}
            {selectedContinentIndex > -1 &&
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

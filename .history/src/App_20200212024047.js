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
      continentList: [],
      selectedContinentCountryList: [],

      selectedContinentIndex: -1,
      selectedCountryFlags: null,
    }
    this.clearFlags = this.clearFlags.bind(this);
  }

  componentDidMount() {
    if (flagData) {
      const continentArray = this.getContinentList();
      this.setState({ continentList: continentArray });
    }
  }

  // on
  onContinentSelect = (selectedValueIndex) => {
    // get country data
    const countryList = this.getContinentSpecificCountriesList(selectedValueIndex);
    this.setState({
      selectedContinentIndex: selectedValueIndex,
      selectedContinentCountryList: countryList
    });
  }

  onCountrySelect = (selectedValueIndexes) => {
    // get map data
    let countriesFlags = null;
    if (selectedValueIndexes.length) {
      countriesFlags = this.getSpecificFlags(selectedValueIndexes);
    }
    this.setState({
      selectedCountryFlags: countriesFlags
    });
  }

  clearFlags = () => {
    // get map data
    this.setState({
      selectedCountryFlags: null
    });
  }

  // 
  getContinentList = () => {
    return flagData.map((value) => {
      return value["continent"];
    });
  }

  //
  getContinentSpecificCountriesList = (continentIndex) => {
    const { countries } = flagData[continentIndex];
    return countries.map((value) => {
      return value["name"];
    });
  }

  //
  getSpecificFlags = (selectedValueIndexes) => {
    const continentIndex = this.state.selectedContinentIndex;
    const { countries } = flagData[continentIndex];
    const selectedCountries = countries.filter((value, key) => {
      return selectedValueIndexes.indexOf(key) >= 0;
    });

    return selectedCountries.map((country) => {
      return country.flag;
    });
  }

  showFlags = () => {
    const selectedCountryFlags = this.state.selectedCountryFlags;
    return selectedCountryFlags.map((value, index) => {
      return (<li key={index}> {value}</li>);
    })
  }




  render() {
    const { continentList, selectedContinentIndex, selectedCountryFlags } = this.state;
    const selectedContinent = selectedContinentIndex > -1 ? continentList[selectedContinentIndex] : false;

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

            <Search values={this.state.continentList}
              className="continent-select"
              onSelect={this.onContinentSelect}
            />

            {selectedContinent &&
              <>
                <p className="column-sub-text">
                  {COPY.SELECTED}
                </p>
                <p className="main-text">
                  {continentList[selectedContinentIndex]}
                </p>
              </>
            }
          </section>

          {/* Country */}
          {selectedContinent &&
            <section className="column">
              <h2 className="main-text">{COPY.COLUMN_TWO_HEADING}</h2>
              <h3 className="column-sub-text">{COPY.COLUMN_TWO_SUBTEXT} </h3>
              <Search values={this.state.selectedContinentCountryList}
                className="country-select"
                onSelect={this.onCountrySelect}
                multiSelect={true}
              />
            </section>
          }

          {/* Flag Column */}
          {selectedCountryFlags &&
            <section className="column">
              <h2 className="main-text">{COPY.SELECTED_FLAGS}</h2>
              <ul className="flag-section">
                {this.showFlags()}
              </ul>
              <button> Clear Flags </button>
            </section>
          }


        </div>
      </main>
    );
  }
}

export default App;

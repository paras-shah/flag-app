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
      continentList: [], //  list of continent in an array
      selectedContinentIndex: -1,// selected continent 
      selectedContinentCountryList: [],// list of countries of selected continent
      selectedCountries: [], // list of countries selected by user 
      selectedCountryFlags: null,// list of flags selected by user 
    }

    this.clearFlags = this.clearFlags.bind(this);
  }

  componentDidMount() {
    if (flagData) {
      /* setting continent on mount */
      const continentArray = this.getContinentList();
      this.setState({ continentList: continentArray });
    }
  }

  /* 
    Functionality: It will update state of comp based on continent select
    Input:Index of continent in continent array
    Return: Update state
  */
  onContinentSelect = (selectedValueIndex) => {
    // get country data
    const countryList = this.getContinentSpecificCountriesList(selectedValueIndex);
    this.setState({
      selectedContinentIndex: selectedValueIndex,
      selectedContinentCountryList: countryList,
      selectedCountries: [],
      selectedCountryFlags: null,
    });
  }

  /* 
    Functionality: It will update state of comp based on country select 
    Input:Indexes of countries in 'selectedContinentCountryList' state array
    Return: Update state - selectedCountries and selectedCountryFlags
  */
  onCountrySelect = (selectedValueIndexes) => {
    // get map data
    let countriesFlags = null;
    if (selectedValueIndexes.length) {
      countriesFlags = this.getSpecificFlags(selectedValueIndexes);
    }
    this.setState({
      selectedCountryFlags: countriesFlags,
      selectedCountries: selectedValueIndexes
    });
  }

  /* 
    Functionality: It will clear selected countries and flags of comp  
    Input:None
    Return: Reset parts of state - selectedCountries and selectedCountryFlags
  */
  clearFlags = () => {
    this.setState({
      selectedCountryFlags: null,
      selectedCountries:[]
    });
  }

  /* 
    Functionality: To get an array of continents from json  
    Input: None
    Return: Reset parts of state - selectedCountries and selectedCountryFlags
  */
  getContinentList = () => {
    return flagData.map((value) => {
      return value["continent"];
    });
  }

  /* 
    Functionality: To get an Countries list baed on continent from json  
    Input: Continent Index works as key, 
    Return:List of countries on that continent
  */
  getContinentSpecificCountriesList = (continentIndex) => {
    const { countries } = flagData[continentIndex];
    return countries.map((value) => {
      return value["name"];
    });
  }

   /* 
    Functionality: To get flags list based on countries
    Input: countries Index work as key, 
    Return:List of flags of selected countries
  */
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

  /* 
    Functionality: To display flags list in DOM
    Return: flags Html
  */
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
          {/* Continent Select Column */}
          <section className="column">
            <h2 className="main-text">{COPY.COLUMN_ONE_HEADING}</h2>
            <h3 className="column-sub-text">{COPY.COLUMN_ONE_SUBTEXT} </h3>

            <Search values={this.state.continentList}
              className="continent-select"
              onSelection={this.onContinentSelect}
              label={COPY.COLUMN_ONE_SUBTEXT}
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

          {/* Country Select Column  */}
          {selectedContinent &&
            <section className="column">
              <h2 className="main-text">{COPY.COLUMN_TWO_HEADING}</h2>
              <h3 className="column-sub-text">{COPY.COLUMN_TWO_SUBTEXT} </h3>
              <Search values={this.state.selectedContinentCountryList}
                className="country-select"
                onSelection={this.onCountrySelect}
                multiSelect={true}
                checkedValues={this.state.selectedCountries}
                label={COPY.COLUMN_TWO_SUBTEXT}
              />
            </section>
          }

          {/* Displaying Flags */}
          {selectedCountryFlags &&
            <section className="column">
              <h2 className="main-text">{COPY.SELECTED_FLAGS}</h2>
              <ul className="flag-section">
                {this.showFlags()}
              </ul>
              <button onClick={this.clearFlags}> Clear Flags </button>
            </section>
          }


        </div>
      </main>
    );
  }
}

export default App;

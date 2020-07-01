import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

const initialState = { isLoading: false, results: [], value: "" };

const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, "$"),
  }));

const source = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun();

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  };

  return memo;
}, {});

export default class SearchExampleCategory extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      const filteredResults = _.reduce(
        source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign
          return memo;
        },
        {}
      );

      this.setState({
        isLoading: false,
        results: filteredResults,
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            aligned="right"
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

// import React from "react";
// // import Script from "react-load-script";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// class AutoAddress extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: "" };
//   }

//   handleChange = (address) => {
//     this.setState({ address });
//   };

//   handleSelect = (address) => {
//     console.log(address);
//     this.setState({ address });
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0])), results.map(result => console.log(result.address_components.postal_code))
//       .then((latLng) =>
//         console.log("Success", this.props.setUserLatLng(latLng))
//       )
//       .catch((error) => console.error("Error", error));
//   };

//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div style={{ marginBottom: "10px" }}>
//             <input
//               {...getInputProps({
//                 placeholder: "Search your address...",
//                 className: "location-search-input",
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map((suggestion) => {
//                 const className = suggestion.active
//                   ? "suggestion-item--active"
//                   : "suggestion-item";
//                 // inline style for demonstration purpose
//                 // const style = suggestion.active
//                 //   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                 //   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       // style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }
// export default AutoAddress;

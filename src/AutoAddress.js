import React from "react";
// import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class AutoAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    console.log(address);
    this.setState({ address });
    geocodeByAddress(address).then((results) =>
      results.map(
        (result) => (
          getLatLng(result),
          console.log(
            result.address_components.find((addComp) => {
              let these = addComp.types[0] == "postal_code";
              return these["long_name"];
            })
          )
        )
      )
    );
    // .then((latLng) =>
    //   console.log("Success", this.props.setUserLatLng(latLng))
    // )
    // .catch((error) => console.error("Error", error));
  };

  // handleSelect = (address) => {
  //   console.log(address);
  //   this.setState({ address });
  //   geocodeByAddress(address)
  //     .then((results) => getLatLng(results[0]))
  //     .then((latLng) =>
  //       console.log("Success", this.props.setUserLatLng(latLng))
  //     )
  //     .catch((error) => console.error("Error", error));
  // };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ marginBottom: "10px" }}>
            <input
              {...getInputProps({
                placeholder: "Search your address...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                // const style = suggestion.active
                //   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                //   : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      // style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default AutoAddress;

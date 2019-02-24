import React from "react";
import Autosuggest from "react-autosuggest";
import PatientsApi from "../lib/APIs/patientsApi";

export default class AutosuggestSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      patients: null,
      value: "",
      suggestions: []
    };
  }

  componentWillMount() {
    PatientsApi.allPatients().then(data => {
      this.setState({ patients: data.patients });
    });
  }

  getSuggestionValue(suggestion) {
    this.props.onChange(suggestion);
    return `${suggestion.name} ${suggestion.surname}`;
  }

  renderSuggestion(suggestion) {
    return (
      <button className="button is-white">
        {suggestion.name} {suggestion.surname}
      </button>
    );
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested({ value }) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      this.setState({
        suggestions: []
      });
    } else {
      let sug = this.state.patients.filter(
        pat => pat.name.toLowerCase().slice(0, inputLength) === inputValue
      );
      this.setState({ suggestions: sug });
    }
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type a name",
      value,
      onChange: (e, n) => this.onChange(e, n)
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={v => this.onSuggestionsFetchRequested(v)}
        onSuggestionsClearRequested={() => this.onSuggestionsClearRequested()}
        getSuggestionValue={sug => this.getSuggestionValue(sug)}
        renderSuggestion={sug => this.renderSuggestion(sug)}
        inputProps={inputProps}
        theme={{
          input: "input is-radiusless is-shadowless",
          container: "control",
          suggestionsContainer: "dropdown",
          suggestionsContainerOpen: "dropdown is-active",
          suggestionsList: "dropdown-content",
          suggestion: "dropdown-item"
        }}
      />
    );
  }
}

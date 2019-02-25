import React from "react";
import PatientsList from "../components/PatientsList";
import { SearchBarPatients } from "../components/SearchBarPatients";
import { withRouter, NavLink } from "react-router-dom";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import debounce from "lodash/debounce";

const getPatientsQuery = gql`
  {
    patients {
      name
      surname
      id
      image
    }
  }
`;

const searchPatientsQuery = gql`
  query($searchQuery: String) {
    patients(filter: $searchQuery) {
      name
      surname
      id
      image
    }
  }
`;

class PatientsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  handleChange(e) {
    const value = e;
    this.handleFilter(value);
  }

  handleFilter = debounce(value => {
    this.props.onSearch(value);
  }, 250);

  render() {
    return (
      <div className="section">
        <div className="columns is-vcentered is-marginless has-text-centered">
          <div className="column">
            <SearchBarPatients onChange={e => this.handleChange(e)} />
          </div>

          <div className="column is-one-fifth">
            <NavLink
              to="/admin/patients/add"
              className="button is-large is-primary is-outlined"
            >
              <span className="icon is-large">
                <i className="fas fa-lg fa-user-plus" />
              </span>
            </NavLink>
          </div>
        </div>
        <PatientsList data={this.props.data} />
      </div>
    );
  }
}

export default compose(
  graphql(getPatientsQuery, {
    options: data => ({
      fetchPolicy: "cache-and-network"
    }),
    props: props => ({
      onSearch: searchQuery => {
        return props.data.fetchMore({
          query: searchQuery === "" ? getPatientsQuery : searchPatientsQuery,
          variables: {
            searchQuery
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return fetchMoreResult;
          }
        });
      },
      data: props.data
    })
  })
)(withRouter(PatientsPage));

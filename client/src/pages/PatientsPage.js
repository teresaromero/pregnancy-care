import React from "react";
import PatientsList from "../components/PatientsList";
import SearchBarPatients from "../components/SearchBarPatients";
import { withRouter, NavLink } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";
import debounce from "lodash/debounce";
import { getPatientsQuery, searchPatientsQuery } from "../lib/graphQL/queries";

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default withApollo(
  compose(
    graphql(getPatientsQuery, {
      options: data => ({
        fetchPolicy: "only-network"
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
  )(withRouter(PatientsPage))
);

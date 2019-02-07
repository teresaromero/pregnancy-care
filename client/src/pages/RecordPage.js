import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NewRecordForm } from "../components/NewRecordForm";

class _RecordPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    PatientsApi.getPatientRecord(`${this.props.match.params.id}`).then(res => {
      this.setState({ data: res.data });
      console.log(this.state.data);
    });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    let { data } = this.state;
    let {patient} = this.props
    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  {data ? (
                    <h3 className="title">
                      {data.name} {data.surname}
                    </h3>
                  ) : (
                    <p>loading</p>
                  )}

                  <h4 className="subtitle" />
                </div>
              </div>
            </article>
          </div>
        </section>
        <hr />
        <div className="section ">
          {data ? (
            data.recordId === undefined ? (
              <NewRecordForm patientId={data._id}/>
            ) : (
              <p></p>
            )
          ) : (
            <p>loading</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export const RecordPage = withRouter(connect(store => ({ patient: store.patient }))(_RecordPage))


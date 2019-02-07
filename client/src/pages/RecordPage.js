import React from "react";
import PatientsApi from "../lib/APIs/patientsApi";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NewRecordForm } from "../components/NewRecordForm";
import { viewPatient, exitPatient } from "../lib/redux/actions";
import { RecordView } from "../components/RecordView";

class _RecordPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let {dispatch}= this.props
    console.log("Component did mount");
    PatientsApi.getPatient(`${this.props.match.params.id}`).then(res => {
      let {data} = res
      this.setState({ data: data },()=>{
        dispatch(viewPatient(this.state.data))
      });
      
    });
  }

  componentWillUnmount() {
    let {dispatch} = this.props
    console.log("Component will unmount");
    dispatch(exitPatient())
  }

  render() {
    let { data } = this.state;
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
              <RecordView />
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


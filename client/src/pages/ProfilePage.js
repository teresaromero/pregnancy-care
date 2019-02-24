import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "../components/Loader";
import moment from "moment";
import { ProfilePicture } from "../components/ProfilePicture";

class _ProfilePage extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <React.Fragment>
        {user ? (
          <React.Fragment>
            <div className="field-wrapper section">
              <div className="section">
                <ProfilePicture />
              </div>
              <div className="columns is-marginless is-paddingless">
                <div className="column">
                  <p className="label">Name and surname</p>
                  <p>
                    {user.name} {user.surname}
                  </p>
                </div>
                <div className="column">
                  <p className="label">ID</p>
                  {user.idNum ? (
                    <p>{user.idNum}</p>
                  ) : (
                    <p className="help has-text-danger">Incomplete</p>
                  )}
                </div>
                <div className="column">
                  <p className="label">Born Date</p>

                  {user.bornDate ? (
                    <p>
                      {moment(user.bornDate).format("Do MMM YY")} (
                      {moment().diff(user.bornDate, "years")} years)
                    </p>
                  ) : (
                    <p className="help has-text-danger">Incomplete</p>
                  )}
                </div>
              </div>

              <div className="columns is-marginless is-paddingless">
                <div className="column">
                  <p className="label">Address</p>
                  {user.address ? (
                    <React.Fragment>
                      <p className="is-marginless">
                        {user.address.street} <span>{user.address.number}</span>
                      </p>
                      <p className="is-marginless">
                        {user.address.city} <span>{user.address.zip}</span>
                      </p>
                      <p className="is-marginless">{user.address.state}</p>
                    </React.Fragment>
                  ) : (
                    <p className="help has-text-danger">Incomplete</p>
                  )}
                </div>
                <div className="column">
                  <p className="label">Phone</p>

                  {user.phone ? (
                    <p>{user.phone}</p>
                  ) : (
                    <p className="help has-text-danger">Incomplete</p>
                  )}
                </div>
                <div className="column">
                  <p className="label">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>

            <div className="field-wrapper section">
              <div className="columns is-marginless is-paddingless">
                <div className="column">
                  <p className="label">Member since:</p>
                  <p>{moment(user.createdAt).format("Do MMMM YYYY")}</p>
                </div>
                <div className="column">
                  <span className="icon has-text-danger">
                    <i className="fas fa-trash-alt" />
                  </span>
                  <span className="has-text-danger">Delete my account</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const ProfilePage = withRouter(connect(store => ({ user: store.user }))(_ProfilePage))



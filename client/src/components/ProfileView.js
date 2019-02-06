import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { InputP } from "./InputP";

import { ProfilePicture } from "./ProfilePicture";
import UserApi from "../lib/APIs/userApi";
import { edit } from "../lib/redux/actions";

class _ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      user: null
    };
  }

  componentWillMount() {
    this.setState({ user: this.props.user });
  }

  componentWillUnmount() {
    this.setState({ user: null });
  }
  handleUserChange(e) {
    let uptUser = { ...this.state.user };
    let { value } = e.target;
    let field = e.target.name;
    uptUser[field] = value;
    this.setState({ user: uptUser });
  }
  handleAddressChange(e) {
    let uptUser = { ...this.state.user };
    let { value } = e.target;
    let field = e.target.name;
    uptUser["address"][field] = value;
    this.setState({ user: uptUser });
  }
  handleEdit() {
    let { dispatch } = this.props;
    console.log(this.state.user);
    UserApi.editProfile(this.state.user).then(user => dispatch(edit(user)));
  }

  render() {
    let { user, disabled } = this.state;
    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <h3 className="title">
                    {user.name} {user.surname}
                  </h3>
                  <h4 className="subtitle">
                    {disabled ? (
                      <button
                        className="button is-light"
                        onClick={() => {
                          this.setState({ disabled: false });
                        }}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <React.Fragment>
                        <button
                          className="button is-warning"
                          onClick={() => this.handleEdit()}
                        >
                          Confirm Changes
                        </button>
                        <button
                          className="button is-danger"
                          onClick={() => this.setState({ disabled: true })}
                        >
                          Cancel
                        </button>
                      </React.Fragment>
                    )}
                  </h4>
                </div>
              </div>
              <ProfilePicture />
            </article>
          </div>
        </section>
        <hr />

        <form>
          <div className="section">
            <p>Identification</p>
            <div className="field-body">
              <InputP
                id="name"
                name="name"
                label="Name"
                value={user.name}
                type="text"
                placeholder="Name"
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
              <InputP
                id="surname"
                name="surname"
                label="Surname"
                value={user.surname}
                type="text"
                placeholder="Surname"
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="id"
                name="idNum"
                label="ID"
                value={user.idNum}
                type="text"
                placeholder="ID"
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
              <InputP
                id="born-date"
                name="bornDate"
                label="Born Date"
                value={moment(user.bornDate).format("YYYY-MM-DD")}
                type="date"
                placeholder=""
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="section">
            <p>Contact Information</p>
            <div className="field-body">
              <InputP
                id="street"
                name="street"
                label="Street"
                value={user.address.street}
                type="text"
                placeholder="Street"
                handleChange={e => this.handleAddressChange(e)}
                disabled={disabled}
              />
              <InputP
                id="number"
                name="number"
                label="Number"
                value={user.address.number}
                type="text"
                placeholder="24"
                handleChange={e => this.handleAddressChange(e)}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="city"
                name="city"
                label="City"
                value={user.address.city}
                type="text"
                placeholder="City"
                handleChange={e => this.handleAddressChange(e)}
                disabled={disabled}
              />
              <InputP
                id="state"
                name="state"
                label="State"
                value={user.address.state}
                type="text"
                placeholder="State"
                handleChange={e => this.handleAddressChange(e)}
                disabled={disabled}
              />
              <InputP
                id="zip"
                name="zip"
                label="Zip"
                value={user.address.zip}
                type="text"
                placeholder="Zip"
                handleChange={e => this.handleAddressChange(e)}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="phone"
                name="phone"
                label="Phone"
                value={user.phone}
                type="text"
                placeholder="Phone"
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
              <InputP
                id="email"
                name="email"
                label="Email"
                value={user.email}
                type="email"
                placeholder="Email"
                handleChange={e => this.handleUserChange(e)}
                disabled={disabled}
              />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export const ProfileView = connect(store => ({ user: store.user }))(
  withRouter(_ProfileView)
);

import React from "react";
import moment from "moment";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { InputP } from "./InputP";
import AuthApi from "../lib/APIs/authApi";
import { edit } from "../lib/redux/actions";

import { ProfilePicture } from "./ProfilePicture";

class _ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      name: null,
      surname: null,
      email: null,
      idNum: null,
      street: null,
      number: null,
      city: null,
      state: null,
      zip: null,
      bornDate: null,
      phone: null
    };
  }

  componentWillMount() {
    let { user } = this.props;
    user.address
      ? this.setState({
          name: user.name,
          surname: user.surname,
          email: user.email,
          idNum: user.idNum,
          street: user.address.street,
          number: user.address.number,
          city: user.address.city,
          state: user.address.state,
          zip: user.address.zip,
          bornDate: user.bornDate,
          phone: user.phone
        })
      : this.setState({
          name: user.name,
          surname: user.surname,
          email: user.email,
          street: "",
          number: "",
          city: "",
          state: "",
          zip: "",
          bornDate: "",
          phone: ""
        });
  }

  componentWillUnmount() {
    this.setState({
      disabled: true,
      name: null,
      surname: null,
      email: null,
      idNum: null,
      street: null,
      number: null,
      city: null,
      state: null,
      zip: null,
      bornDate: null,
      phone: null,
      image: null
    });
  }

  handleEdit() {
    this.setState({ disabled: true });
    let { user, dispatch } = this.props;
    const {
      name,
      surname,
      email,
      idNum,
      street,
      number,
      city,
      state,
      zip,
      bornDate,
      phone,
      image
    } = this.state;
    let { _id } = user;

    AuthApi.edit(
      name,
      surname,
      email,
      idNum,
      street,
      number,
      city,
      state,
      zip,
      bornDate,
      phone,
      image,
      _id
    )
      .then(user => dispatch(edit(user)))
      .catch(e => console.log(e));
  }



  render() {
    let { user, match } = this.props;
    let {
      disabled,
      name,
      surname,
      email,
      idNum,
      street,
      number,
      city,
      state,
      zip,
      bornDate,
      phone,
      image
    } = this.state;
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
                        class="button is-light"
                        onClick={() => {
                          this.setState({ disabled: false });
                        }}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        class="button is-warning"
                        onClick={() => this.handleEdit()}
                      >
                        Confirm Changes
                      </button>
                    )}
                  </h4>
                </div>
              </div>
              <ProfilePicture/>
            </article>
          </div>
        </section>
        <hr />

        <form method="POST" onSubmit={e => this.handleSubmit(e)}>
          <div className="section">
            <p>Identification</p>
            <div className="field-body">
              <InputP
                id="name-patient"
                name="name"
                label="Name"
                value={name}
                type="text"
                placeholder="Name"
                handleChange={e => this.setState({ name: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="surname-patient"
                name="surname"
                label="Surname"
                value={surname}
                type="text"
                placeholder="Surname"
                handleChange={e => this.setState({ surname: e.target.value })}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="id-patient"
                name="id"
                label="ID"
                value={user.idNum ? idNum : ""}
                type="text"
                placeholder="ID"
                handleChange={e => this.setState({ idNum: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="born-date-patient"
                name="born-date"
                label="Born Date"
                value={bornDate}
                type="date"
                placeholder=""
                handleChange={e => this.setState({ bornDate: e.target.value })}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="section">
            <p>Contact Information</p>
            <div className="field-body">
              <InputP
                id="street-patient"
                name="street"
                label="Street"
                value={street}
                type="text"
                placeholder="Street"
                handleChange={e => this.setState({ street: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="number-patient"
                name="number"
                label="Number"
                value={number}
                type="text"
                placeholder="24"
                handleChange={e => this.setState({ number: e.target.value })}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="city-patient"
                name="city"
                label="City"
                value={city}
                type="text"
                placeholder="City"
                handleChange={e => this.setState({ city: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="state-patient"
                name="state"
                label="State"
                value={state}
                type="text"
                placeholder="State"
                handleChange={e => this.setState({ state: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="zip-patient"
                name="zip"
                label="Zip"
                value={zip}
                type="text"
                placeholder="Zip"
                handleChange={e => this.setState({ zip: e.target.value })}
                disabled={disabled}
              />
            </div>
            <div className="field-body">
              <InputP
                id="phone-patient"
                name="phone"
                label="Phone"
                value={phone}
                type="text"
                placeholder="Phone"
                handleChange={e => this.setState({ phone: e.target.value })}
                disabled={disabled}
              />
              <InputP
                id="email-patient"
                name="email"
                label="Email"
                value={email}
                type="email"
                placeholder="Email"
                handleChange={e => this.setState({ email: e.target.value })}
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

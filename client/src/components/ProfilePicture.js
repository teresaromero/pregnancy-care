import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserApi from "../lib/APIs/userApi";
import { edit } from "../lib/redux/actions";

class _ProfilePicture extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  handlePhoto(e) {
    let { dispatch } = this.props;

    this.setState({ file: e.target.files[0] }, () => {
      UserApi.uploadProfilePicture(this.state.file)
        .then(user => {
          dispatch(edit(user));
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    let { user } = this.props;
    return (
      <figure className="media-right">
        <p className="image is-96x96">
          <img className="is-rounded" src={user.image} alt="profile" />
        </p>

        <div id="uploadFile" className="file">
          <label className="file-label" onChange={e => this.handlePhoto(e)}>
            <input className="file-input" type="file" name="resume" />
            <span className="file-icon icon is-large">
              <i className="fas fa-lg fa-camera" />
            </span>
          </label>
        </div>
      </figure>
    );
  }
}

export const ProfilePicture = connect(store => ({ user: store.user }))(
  withRouter(_ProfilePicture)
);

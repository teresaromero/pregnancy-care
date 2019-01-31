import { post } from "./fetchConfig";

export default class UploadApi {
  static profileImg(file, user) {
    return post("/api/upload/profile-picture", { file, user })
      .then(res => res.data.user)
      .catch(err => console.log(err));
  }
}

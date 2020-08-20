import B21RequestModel from './b21.request.model';

export default class addUserProfileImageRequestModal extends B21RequestModel {
  ProfilePicture: string;

  constructor(ProfilePicture: string, AuthenticationToken: string = null) {
    super(AuthenticationToken);
    this.ProfilePicture = ProfilePicture;
  }
}

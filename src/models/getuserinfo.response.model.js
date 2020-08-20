import { UserConfigurationInfoEntity, UserEntity, UserSignupRegistrationInfoEntity } from './entities';

export default class GetUserInfoResponseModel {
  User: UserEntity;
  UserSignupRegistrationInfo: UserSignupRegistrationInfoEntity;
  UserConfigurationInfo: UserConfigurationInfoEntity;
}

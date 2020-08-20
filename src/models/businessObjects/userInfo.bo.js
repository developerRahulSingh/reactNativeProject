import { OptInItemStoreEntity, UserConfigurationInfoEntity, UserEntity, UserSignupRegistrationInfoEntity } from '../entities';

class UserInfoBO {
  User: UserEntity;
  UserSignupRegistrationInfo: UserSignupRegistrationInfoEntity;
  UserConfigurationInfo: UserConfigurationInfoEntity;
  OptInInfo: OptInItemStoreEntity;
}

export { UserInfoBO };

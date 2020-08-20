import { AuthenticationTokenEntity, GoalDashboardEntity, OptInItemStoreEntity, UserConfigurationInfoEntity, UserEntity, UserSignupRegistrationInfoEntity } from '../entities';

class UserBO {
  User: UserEntity;
  UserSignupRegistrationInfo: UserSignupRegistrationInfoEntity;
  UserConfigurationInfo: UserConfigurationInfoEntity;
  OptInInfo: OptInItemStoreEntity;
  AuthenticationToken: AuthenticationTokenEntity;
  GoalDashboard: GoalDashboardEntity;
}

export { UserBO };

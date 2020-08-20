import { AuthenticationTokenEntity } from '../entities';
import HttpResponseModel from './base/httpResponse.model';

class UserAuthenticationResponseModel extends HttpResponseModel<AuthenticationTokenEntity> {

}

export { UserAuthenticationResponseModel };

import { userActions } from '../../_actions/user.actions';
import { userConstants } from '../../_constants/user.constants';

describe('actions', () => {
    it('should create action to logout user', () => {
        const expectedAction = {
            type: userConstants.LOGOUT,
        };
        expect(userActions.logout()).toEqual(expectedAction);
    });
});

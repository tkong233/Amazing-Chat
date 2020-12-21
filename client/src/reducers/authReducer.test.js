import { SET_CURRENT_USER, USER_LOADING, UPDATE_PICTURE, DELETE_ACCOUNT } from "../actions/types";
import authReducer from './authReducer';

describe('Auth Reducer', ()=>{
    it('Should return default state', ()=>{
        const newState = authReducer(undefined, {});
        expect(newState).toEqual({
            isAuthenticated: false,
            user: {},
            loading: false});
    });
    it ('Should return new state if receiving type', () =>{
        const user = {isAuthenticated: false,
            user: {},
            loading: true};
        const newState = authReducer(undefined, {
            type: USER_LOADING,
            payload: user
        });
        expect(newState).toEqual(user);
    });
    it ('Should delete account', () =>{
        const user = {isAuthenticated: false,
            user: {},
            loading: false};
        const newState = authReducer(undefined, {
            type: DELETE_ACCOUNT,
            payload: user
        });
        expect(newState).toEqual(user);
    });
    it ('should return initial state', ()=>{
        expect(authReducer(undefined, {})).toMatchSnapshot();
    });
});
import { GET_ERRORS } from "../actions/types";
import errorReducer from './errorReducer';

describe('Error Reducer', ()=>{
    it('Should return default state', ()=>{
        const newState = errorReducer(undefined, {});
        expect(newState).toEqual({});
    });
    it ('Should return new state if receiving type', () =>{
        const error = {error: 'Test error'};
        const newState = errorReducer(undefined, {
            type: GET_ERRORS,
            payload: error
        });
        expect(newState).toEqual(error);
    });
    it ('should return initial state', ()=>{
        expect(errorReducer(undefined, {})).toMatchSnapshot();
    });
});
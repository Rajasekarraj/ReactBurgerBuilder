import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Testing Auth Reducer', () => {
    it('Should return the initialState value', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        })
    })

    it('Should set the token and userId after successful auth', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'test-token',
            userId: 'test-userId'
        })).toEqual({
            token: 'test-token',
            userId: 'test-userId',
            error: null,
            loading: false,
            redirectPath: '/'
        })
    })
})
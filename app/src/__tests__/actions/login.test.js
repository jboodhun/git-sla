import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import * as actions from '../../actions/todos'
import * as types from '../../actions/action-types'
import expect from 'expect' // You can use any testing library
import getTodos from '../../__mockData__/todos.json';

import * as LoginActions from '../../../bower_components/cmpp-core/react/utils/CmppLogin/action-login';

import localStorageMock from '../../__mocks__/localStorage';

window.localStorage = localStorageMock;

import axios from 'axios';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('LOGIN TESTS', () => {

  beforeEach(function () {
    //localStorageMock.setItem('cmpp-session', '{"token": "1234"}');
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('Check Cmpp Core Login', () => {

    // TEST DEFAULT STATE.
    // we should get an empty array by default from this reducer.
    it('Checking Login states', () => {

        // By default Local Storage is empty so this should redirect to doLogin();
        var result = LoginActions.checkLoginSession();
        // verify
        expect(result).toEqual('doLogin');
    });

    /*
    it('Checking Login Permissions', () => {

        localStorageMock.setItem('cmpp-session', '{"token": "1234"}');

        var result = LoginActions.checkLoginPermissions();

        console.log(result);
        // verify
        expect(result).toEqual('doLogin');
    })
    */

  });

});
/* Important

Remove testEnvironment: Node
Add Window: true

*/

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as Actions from '../../actions/action-types';
import * as AssetsActions from '../../actions/index';
import localStorageMock from './mocks/localStorage';
import * as assetsMock from '../../__mocks__/assets';
const assets = assetsMock.getAssetsFull();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = localStorageMock;

var set_filters = {
  contentType: '',
  materialID: '',
  title: '',
  assetGroups: '',
  modifiedMin: '',
  orderBy: 'modified',
  direction: 'desc',
  offset: 0,
  limit: 10,
  cmppid: ''
}

describe('ASSETS ACTIONS', () => {
  beforeEach(function () {
    localStorageMock.setItem('cmpp-session', '{"token": "1234"}');
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });


  it('creates ITEMS_FETCH_DATA_SUCCESS after successfuly fetching assets', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: assets,
      });
    });

    const expectedActions = [
      {
        type: Actions.UPDATE_FILTERS,
        filters: set_filters
      },
      {
        type: Actions.ITEMS_IS_LOADING,
        isLoading: true
      },
      {
        type: Actions.ITEMS_IS_LOADING,
        isLoading: false
      },
      {
        type: Actions.ITEMS_FETCH_DATA_SUCCESS,
        assetResponse: {
          success: true,
          total: assets.Total,
          items: assets._embedded.item
        }
     },
   ];

    const store = mockStore({});

    return store.dispatch(AssetsActions.itemsFetchData(set_filters)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

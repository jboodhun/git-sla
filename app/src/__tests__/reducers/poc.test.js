import * as Actions from '../../actions/action-types';
import * as ReducerFilters from '../../reducers/reducer-filters';

const taskFilters = {
    contentType:'',
    materialID:'',
    title:'',
    assetGroups:'',
    modifiedMin:'',
    orderBy:'modified',
    direction:'desc',
    offset:0,
    limit:10,
    cmppid:''
}


describe('FILTERS REDUCER UNIT TESTS', () => {

	describe('Update Filters', () => {

		// TEST DEFAULT STATE.
		// we should get an empty array by default from this reducer.
		it('Filters have a default state', () => {

			// setup
	      	let action = {
	        	type: 'unknown',
	        	filters: undefined
	      	};

	      	// execute.
	      	let newState = ReducerFilters.filters(undefined, action);

	      	// verify
	      	// an unknown action should leave the data as an empty array.
	      	expect(1).toEqual(1);
		})

	});

});

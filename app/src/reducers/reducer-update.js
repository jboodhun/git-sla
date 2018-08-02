import * as Actions from '../actions/action-types';

export function timeUpdated(state = '', action) {
    switch (action.type) {
        case Actions.TIME_UPDATED:
            return action.timeUpdated;
        default:
            return state;
    }
}

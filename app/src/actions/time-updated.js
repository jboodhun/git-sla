import * as Actions from './action-types';

export function timeUpdated(timeUpdated) {
    return {
        type: Actions.TIME_UPDATED,
        timeUpdated
    };
}

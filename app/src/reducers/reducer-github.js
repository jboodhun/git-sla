/**
 The part of the application that is responsible for storing the tasks.
*/

import * as Actions from '../actions/action-types';

export function reposHasErrored(state = false, action) {
    switch (action.type) {
        case Actions.REPOS_HAS_ERRORED:
            return action.reposHasErrored;
        default:
            return state;
    }
}

export function reposIsLoading(state = false, action) {
    switch (action.type) {
        case Actions.REPOS_IS_LOADING:
            return action.reposIsLoading;

        default:
            return state;
    }
}

export function repos(state = [], action) {
    switch (action.type) {
        case Actions.REPOS_FETCH_SUCCESS:
          return action.repos;
        default:
          return state;
    }
}

export function githubUser(state = '', action) {
    switch (action.type) {
        case Actions.GITHUB_USER:
          return action.githubUser;
        default:
          return state;
    }
}

export function githubGravatar(state = '', action) {
    switch (action.type) {
        case Actions.GITHUB_GRAVATAR:
          return action.githubGravatar;
        default:
          return state;
    }
}

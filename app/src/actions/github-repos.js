import Axios from 'axios';
import * as Actions from './action-types';
import * as TimeUpdatedActions from './time-updated';
import moment from 'moment';

export function reposHasErrored(bool) {
    return {
        type: Actions.REPOS_HAS_ERRORED,
        reposHasErrored: bool
    };
}

export function reposIsLoading(bool) {
    return {
        type: Actions.REPOS_IS_LOADING,
        reposIsLoading: bool
    };
}

export function reposFetchDataSuccess(repos) {
    return {
      type: Actions.REPOS_FETCH_SUCCESS,
      repos
    };
}

export function githubUser(githubUser) {
    return {
      type: Actions.GITHUB_USER,
      githubUser
    };
}

export function githubGravatar(githubGravatar) {
    return {
      type: Actions.GITHUB_GRAVATAR,
      githubGravatar
    };
}

export function reposFetchData(repos) {

    return (dispatch) => {

      dispatch(reposIsLoading(true));

      var url = 'https://api.github.com/users/'+GIT_USERNAME+'/repos?sort=pushed&direction=desc&per_page=100';

      //var url = 'https://jsonplaceholder.typicode.com/todos/';

      const instance = Axios.create({
          //headers: {'Authorization':  } // If any required.
      });

      return instance.get(url)
      .then((response) => {
          return response.data;
      })
      .then((repos) => {
          // Sort by stars DESC.
          repos.sort(function(a,b) {
            return b.stargazers_count - a.stargazers_count;
          });
          dispatch(reposFetchDataSuccess(repos));
          dispatch(githubUser(repos[0].name));
          dispatch(githubGravatar(repos[0].owner.avatar_url));

          dispatch(TimeUpdatedActions.timeUpdated(moment().format()));
          dispatch(reposIsLoading(false));
      })
      .catch((error) => {
          dispatch(reposHasErrored(true));
      });
    }
}

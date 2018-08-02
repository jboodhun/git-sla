import React, { Component } from 'react';
import Axios from 'axios';
import classnames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom';
import Breadcrumb from '../../layout/Breadcrumb/';

// Calling our tasklist smart component that is connected to Redux store.
import GithubRepoDetails from '../../containers/Github/repo-details';

class RepoDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GithubRepoDetails />
    );
  }
}

export default RepoDetails;

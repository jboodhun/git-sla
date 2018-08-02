import React, { Component } from 'react';
import Axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Breadcrumb from '../../layout/Breadcrumb/';
import { Container, Row, Col } from "reactstrap";

// Calling our tasklist smart component that is connected to Redux store.
import GithubRepos from '../../containers/Github/repos';

class Repos extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <GithubRepos />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.repos
  };
};

/**
 * Hook the action functions with Redux Dispatch.
 * Pass actions as a prop.
 * Dispatch means Call A Function.
 * bindActionCreators means Connect.
*/

/**
 * In order to connect our component to the store, we use to use Connect.
*/
export default connect(mapStateToProps)(Repos);

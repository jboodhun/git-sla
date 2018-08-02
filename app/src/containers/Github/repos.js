import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Considering adding Bootstrap table with pagination.
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import BootstrapTable from 'react-bootstrap-table-next';
//import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
//import paginationFactory from 'react-bootstrap-table2-paginator';

/* Importing All Actions */
import * as GithubReposActions from '../../actions/github-repos';

class Repos extends Component {

  constructor (props){

    super(props);
    this.refresh = this.refresh.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.props.fetchRepos();
    // For a future polling mechanism.
    // this.setRefreshInterval();
  }

  setRefreshInterval() {
    this.clearRefreshInterval();
    setInterval(this.refresh, 10000);
    this.refresh();
  }

  clearRefreshInterval() {
    clearInterval(this._refreshInterval);
  }

  refresh() {
    console.log('Fetch ...');
    this.props.fetchRepos();
  }

  componentWillUnmount() {
    clearInterval(this._refreshInterval);
  }

  search(event) {
    //console.log(event.target.value);
    //$('ul').hide();
    var regex = new RegExp('\\b\\w*' + event.target.value + '\\w*\\b');
    $('.repo').hide().filter(function () {
        return regex.test($(this).data('name'))
    }).show();
  }

  render() {
    var repos = this.props.repos;

    return (
      <div>
        <div id="head">
          <h1>Repositories</h1>
          <input type="text" id="search" name="search" className="form-control" placeholder="Search ..." onChange={this.search}/>
        </div>
        <ul>
        {repos.map((repo) =>
          <li key={repo.id} data-name={repo.name} className="repo">
            <p><strong>{repo.name}</strong> <span className="details text-muted"><i className="fa fa-star"></i> {repo.stargazers_count} <i className="fa fa-eye"></i> {repo.watchers_count} <i className="fa fa-code-branch"></i> {repo.forks_count}</span></p>
            <p className="text-muted">{repo.description}</p>
            <p className="updated">{moment(repo.pushed_at).fromNow()}</p>
          </li>
        )}
        </ul>
      </div>
    );
  }
}

Repos.propTypes = {
    fetchRepos: PropTypes.func.isRequired
};

/**
 * All this function does is, it takes a piece of the application state and data from the store
 * And passes it into the component as properties.
 * So this component can access whatever piece of state and data it wants from the store.
*/
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
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRepos: () => dispatch(GithubReposActions.reposFetchData())
    };
};

/**
 * In order to connect our component to the store, we use to use Connect.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Repos);

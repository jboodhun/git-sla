import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Updated from '../../components/Updated/';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <header>
        <div className="inner">
          <img src={this.props.githubGravatar} width="60"/><span id="user">{this.props.githubUser} <span className="text-muted">Github Activity Dashboard</span></span>
          <Updated />
        </div>
      </header>
    )
  }
}

Header.propTypes = {

};

const mapStateToProps = (state) => {
    return {
      githubUser: state.githubUser,
      githubGravatar: state.githubGravatar
    };
};


export default connect(mapStateToProps)(Header);

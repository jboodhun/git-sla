/* React Modules*/
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import configureStore from '../../store/configureStore';
const store = configureStore();

import Demo from '../../components/demo/demo';

class Full extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <Switch>
                <Route path="/" name="Tasks List" component={Demo}/>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(Full);

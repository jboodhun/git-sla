/* React Modules*/
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Import Core Layout Components*/
import Header from '../../layout/Header/';
import Breadcrumb from '../../layout/Breadcrumb/';


import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';


import configureStore from '../../store/configureStore';
const store = configureStore();

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.setState({ cmppsession: localStorage.getItem('cmpp-session') });
  }

  render() {

    return (
      <div className="app">

        <div className="app-body">


          <main className="main">

            <div className="container-fluid">

              <Switch>
                <Route path="/workflow/:id" name="Workflow ID" component={CmppWorkflowDetails}/>
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
        notifications: state.default
    };
};

export default connect(mapStateToProps)(Detail);

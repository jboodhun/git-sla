/* React Modules*/
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/* Import Core Layout Components*/
//import Header from '../../layout/Header/';
import Header from '../../layout/Header/';
import Breadcrumb from '../../layout/Breadcrumb/';

import Github from '../../views/Github/repos';

class Full extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="app">
        <Header />
        <div className="app-body">

          <main className="main">

              <Switch>
                <Route path="/" name="Repos List" component={Github}/>
              </Switch>

          </main>

        </div>

      </div>
    );
  }
}

export default Full;

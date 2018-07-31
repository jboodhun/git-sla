import React, { Component } from 'react';
import Axios from 'axios';
import classnames from 'classnames';

//import ReactDataGrid from 'react-data-grid';
//import ReactDataGridPlugins from 'react-data-grid-addons';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Breadcrumb from '../../layout/Breadcrumb/';

// Calling our tasklist smart component that is connected to Redux store.
import TaskList from '../../containers/Tasks/tasksList';
import Table from '../../containers/Tasks/table';

class CmppTasks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <Table/>
      </div> 
    );
  }
}

export default CmppTasks;
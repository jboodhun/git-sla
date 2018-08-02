/* Container is the component with the brains
   Do all the heavy lifting here.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import configureStore from '../../store/configureStore';
import { Link } from 'react-router-dom';
import * as Helpers from '../Utils/helpers';
import moment from 'moment';

/* Importing All Actions */
import * as PermissionsActions from '../../actions/permissions';
import { addNotification } from '../../actions/notifications';
import * as TaskActions from '../../actions/task-actions';

import * as WorkflowDetailsActions from '../../actions/workflow-details';

import { Button } from 'react-mdc-web';
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter } from 'react-mdc-web';

import CmppLoader from '../../../../app/bower_components/cmpp-core/react/ui/CmppLoader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import './details.css';
import './workflow-timeline.css';

// React table custom style

const store = configureStore();
const queryString = require('query-string');
var _ = require('lodash');

class WorkflowDetails extends Component {

  constructor (props){

    super(props);
    this.refresh = this.refresh.bind(this);
    this.getWorkflowId = this.getWorkflowId.bind(this);
    this.getWorkflowTitle = this.getWorkflowTitle.bind(this);
    this.renderWorkflowTimeline = this.renderWorkflowTimeline.bind(this);
    this.renderInvert = this.renderInvert.bind(this);
    this.renderBadge = this.renderBadge.bind(this);
    this.renderTsTime = this.renderTsTime.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.renderType = this.renderType.bind(this);
    this.renderInput = this.renderInput.bind(this);

    this.state = {
      workflowDetails:[],
      activeTab: '1',
      load: false,
      workflowTs: {},
      videofile: ''
    }
  }

  componentDidMount() {
    this.props.fetchWorkflow(this.getWorkflowId());
    this.setRefreshInterval();
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
    this.props.fetchWorkflow(this.getWorkflowId());
  }

  componentWillUnmount() {
    clearInterval(this._refreshInterval);
  }

  getWorkflowId() {
    var query = location.pathname;
    query = query.split('/');
    return query[2];
  }

  getWorkflowTitle() {
    return this.props.workflowDetails.Title;
  }

  renderInvert(Error) {
    var invert = 'timeline';
    if(Error) {
      invert = 'timeline-inverted red';
    }
    return invert;
  }

  renderBadge(Error) {
    var badge = 'timeline-badge success';
    if(Error) {
      badge = 'timeline-badge danger';
    }
    return badge;
  }

  renderTsTime(Time) {
     return moment.utc(Time).format('DD MMMM YYYY HH:mm:ss');
  }

  renderIcon(WT) {

    var Error = WT.Error;

    var status = WT.Type;

    status = status.split('step_');

    var step = status[1];

    var icon = 'fa-check-circle';

    if(Error) {
      icon = 'fa-times-circle';
      return icon;
    }

    if(!Error) {

      if(step == 'started') {
        return 'fa-play-circle';
      }

      if(step == 'created') {
        return 'fa-plus-circle';
      }

      if(step == 'completed') {
        return 'fa-check-circle';
      }

      return 'fa-play-circle';
    }


  }

  renderType(Type) {
    var T = Type.replace('_', ' ');
    return T;
  }

  renderInput(Input) {
    if(Input) {
      var I = JSON.parse(Input);
      //console.log(I);
      return 'VideoFile: '+I.videofile;
    }
  }

  renderWTClass(WT) {

  }

  renderWorkflowTimeline() {
    var WorkFlowExecHistory = this.props.workflowDetails;

    if(WorkFlowExecHistory) {
      var workflowTimeline = WorkFlowExecHistory;
      var invert = 'timeline';
      return (<ul className="timeline">
      {workflowTimeline.map((WT, index) => (
          <li key={index} className={this.renderInvert(WT.Error)}>
            <div className={this.renderBadge(WT.Error)}><i className={'fa '+this.renderIcon(WT)}></i></div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">{WT.Name}</h4>
                <p className="capitalize">{this.renderType(WT.Type)}</p>

                <p><small className="text-muted"><i className="fa fa-clock"></i> {this.renderTsTime(WT.Timestamp)}</small></p>
              </div>
              <div className="timeline-body">

              </div>
            </div>
          </li>
      ))}
      </ul>);
    }
  }

  renderMetadataItem(label, value, second_value=null, edit_key=null) {
    var me = this;

    if (second_value != null) {
      var second_value_part = <span><span className="separator">by</span>{second_value}</span>;
    }

    if (edit_key != null ) {

      var allowed = false;

      if (this.props.groupMemberships._embedded) {

        this.props.groupMemberships._embedded.item.forEach(function (gp) {
          var match = _.findKey(me.props.permissions.AssetGroupRights, { 'AssetGroupId': gp.AssetGroupId});
          var operations = _.at(me.props.permissions.AssetGroupRights, match);
          var allowedOperations = _.at(operations[0], 'Operations');
          // We Check if an Update is allowed.
          if (_.includes(allowedOperations[0], 'Update')) {
            allowed = _.includes(allowedOperations[0], 'Update');
          }
        });

        if (allowed) {
          var edit_part = <paper-icon-button class="edit-button" icon="editor:mode-edit" onClick={(e) => {this.openEditTxDialog(e, label, value, edit_key)}}></paper-icon-button>;
        }
      }
    }

    return (
      <div className="row item core-metadata">
        <div className="col-sm-3">
          <label><span className="name">{Helpers.capitalize(label)}:</span></label>
        </div>
        <div className="col-sm-9">
          <label className="value">
            {value}
            {second_value_part}
            {edit_part}
          </label>
        </div>
      </div>
    );
  }

  renderAccessGroups(label, value) {

    if (value._embedded) {
      var tags = value._embedded.item.map((item) => {
        return (
          <span key={item.AssetGroupId} className="label label-primary">{item.AssetGroupName}</span>

        );
      });
    }

    return (
      <div className="row item core-metadata">
        <div className="col-sm-3">
          <label><span className="name">{Helpers.capitalize(label) + ':'}</span></label>
        </div>
        <div className="col-sm-8">
          <label className="value">
            {tags}
          </label>
        </div>
      </div>
    );
  }

  render() {

    var queryString = window.location.href;
    var queryString = queryString.split('workflow/');

    var ID = queryString[1];

    document.title = 'Portal: Workflow: '+ID;

    var WorkFlowExecHistory = this.props.workflowDetails.WorkFlowExecHistory;

    if(this.props.workflowDetails){
      var first;
      for (var i in this.props.workflowDetails) {
          if (this.props.workflowDetails.hasOwnProperty(i) && typeof(i) !== 'function') {
              first = this.props.workflowDetails[i];
              break;
          }
      }
      if(first) {
        var input = JSON.parse(first.Input);
        var videofile = input.videofile;
        var authority = input.authority;
        var metadataFile = input.metadatafile;
      }
      //var videofile = this.renderInput(first.Input);
    }

	  return (
		  <div id="details-page">

        <div  className="row row-section">
          <div className="col-md-12">
            <h1 className="asset-detail">{Helpers.capitalize(this.props.workflowDetails.Name)}</h1>
            <h2>{Helpers.capitalize(this.props.workflowDetails.Authority)}</h2>
          </div>
        </div>

			  <div className="row row-section">

          <div className="col-md-12">
            <div className="row" id="head-right" >
              <div id="metadata" className="col-md-12">
                <h4>{Helpers.capitalize('Workflow')} - {ID}</h4>

                <p><strong>Videofile:</strong> {videofile}</p>
                <p><strong>Authority:</strong> {authority}</p>
                <p><strong>Metadata File:</strong> {metadataFile}</p>
              </div>

              <div className="container-fluid workflow-timeline">
                <div className="col-sm-12 col-sm-offset-1 col-md-12 col-md-offset-0 main">
                  <div id="wrapper">
                    <div className="container">


                        {this.renderWorkflowTimeline()}


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkflowDetails.propTypes = {
  fetchWorkflow: PropTypes.func.isRequired,
  fetchPermissions: PropTypes.func.isRequired,
  updateAsset: PropTypes.func.isRequired
};

/**
 * All this function does is, it takes a piece of the application state and data from the store
 * And passes it into the component as properties.
 * So this component can access whatever piece of state and data it wants from the store.
*/
const mapStateToProps = (state) => {
    return {
        workflowDetails: state.workflowDetails,
        notifications: state.default,
        txOptions: state.txOptions,
        groupMemberships: state.groupMemberships,
        permissions: state.permissions
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
      fetchWorkflow: (id) => dispatch(WorkflowDetailsActions.fetchWorkflowDetails(id)),
      fetchPermissions: () => dispatch(PermissionsActions.fetchPermissions()),
      updateAsset: (asset) => dispatch(AssetDetailsActions.updateAsset(asset))
    };
};

/**
 * In order to connect our component to the store, we use to use Connect.
*/
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDetails);

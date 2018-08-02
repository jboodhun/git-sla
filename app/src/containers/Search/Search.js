import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import configureStore from '../../store/configureStore';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { Router, Route, Link } from 'react-router-dom';

const store = configureStore();

const router = {};
const path = location.pathname;

import './search.css';

class Search extends Component {

	constructor (props){
	    super(props);
	    this.toggle = this.toggle.bind(this);
	    this.change = this.change.bind(this);
	    this.cmppidChange = this.cmppidChange.bind(this);
	    this.searchByCmppid = this.searchByCmppid.bind(this);
	    this.setMaterialid = this.setMaterialid.bind(this);
      this.setTitle = this.setTitle.bind(this);
	    this.setAssetGroup = this.setAssetGroup.bind(this);
	    this.setTaskType = this.setTaskType.bind(this);
	    this.setTaskStatus = this.setTaskStatus.bind(this);
	    this.setCmppid = this.setCmppid.bind(this);
	    this.clearSearch = this.clearSearch.bind(this);
      this.setModified = this.setModified.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.setSupplier = this.setSupplier.bind(this);
      this.changeSupplier = this.changeSupplier.bind(this);


        this.state = {
            materialid: '',
	    	    supplier: '',
            extid: '',
            filename: '',
            status: '',
            workorder: '',
            title: '',
            id: '',
            search: '',
            queryParams: {}
	    }

    this.state.modifiedOptions = [
      {
        name: "Any time",
        value: ''
      },
      {
        name: "Today",
        value: '1 day'
      },
      {
        name: "24 hours",
        value: "24 hours",
      },
      {
        name: "48 hours",
        value: "48 hours"
      },
      {
        name: "7 days",
        value: "7 days"
      },
      {
        name: "Month",
        value: "1 month"
      },
      {
        name: "Year",
        value: "1 year"
      }
    ];

  }

  getLocation() {
    // this is the best way to get the current search value?
    return window.location
  }

  componentDidMount() {
      //console.log(window.location = window.location+'/search');
    	//this.props.fetchAuthorities();
  }

  componentWillMount() {
    //this.setState({ search: '?search' })
    //console.log('Will Mount ...');
  }

  handleChange(event) {

    event.preventDefault();
    var thisEvent = {};
    const id = event.target.id;
    const value = event.target.value;

    thisEvent[id] = value;

    QueryParams.pushQuery(thisEvent);
  }


	toggle(e, element) {
    $(element).slideToggle(100);
    $(e.target).toggleClass('open');
  }


	change(event) {
		    console.log('On Change ...');
        this.handleChange(event);
        //history.push('?cart');
        //console.log(event.target.id);
        if (event.target.value.length >= 2) {
            this.setMaterialid(event.target.value);
            //this.setSupplier(event.target.value);
        } else if (event.target.value.length == 0 ) {
            this.setMaterialid('');
            //this.setSupplier('');
        }
	}

  changeSupplier(event) {
        console.log('On Change ...');
        this.handleChange(event);
        if (event.target.value.length >= 2) {
            this.setSupplier(event.target.value);
            //this.setSupplier(event.target.value);
        } else if (event.target.value.length == 0 ) {
            this.setSupplier('');
            //this.setSupplier('');
        }
  }

    cmppidChange(event) {
        if (event.target.value == '') {
            this.setCmppid(event.target.value);
        }
    }

    searchByCmppid() {
        const input_value = document.getElementById('cmppid_input').value;
        const cmppid = input_value.slice(input_value.lastIndexOf(':') + 1);
        this.setCmppid(cmppid);
    }

    setMaterialid(value) {
        this.setState({materialid: value});
        this.props.fetchWorkflows({materialid: value, offset:0});
    }

    setSupplier(value) {
        this.setState({supplier: value});
        this.props.fetchWorkflows({supplier: value, offset:0});
    }

    setTitle(value) {
        this.setState({title: value});
        this.props.fetchData({title: value, offset:0});
    }

    setCmppid(value) {
        this.setState({cmppid: value});
        this.props.fetchData({cmppid: value, offset:0});
    }

	setAssetGroup(value) {
		this.setState({assetGroup: value});
		this.props.fetchData({assetGroups: value, offset:0});
	}

  setStatus(value) {

    if(value=='ALL') {
      value='';
    }

    var thisEvent = {};
    const id = 'status';

    thisEvent[id] = value;

    QueryParams.pushQuery(thisEvent);

    this.setState({status: value});
    this.props.fetchWorkflows();
  }

    setTaskType(value) {
		this.setState({taskType: value});
		this.props.fetchData({taskTypeID: value, offset:0});
	}

    setTaskStatus(value) {
		this.setState({taskStatus: value});
		this.props.fetchData({state: value, offset:0});
	}

    setContentType(value) {
        this.setState({contentType: value});
        this.props.fetchData({contentType: value, offset:0});
    }

    setModified(value) {

      this.setState({modified: value});

      let modifiedMin = '';

      switch(value) {
        case '1 day':
          modifiedMin = moment().utc().startOf('day').toJSON();
          break;
        case '24 hours':
          modifiedMin = moment().subtract(24, 'h').toJSON();
          break;
        case '48 hours':
          modifiedMin = moment().subtract(48, 'h').toJSON();
          break;
        case '12 hours':
          modifiedMin = moment().subtract(12, 'h').toJSON();
          break;
        case '7 days':
          modifiedMin = moment().subtract(7, 'd').toJSON();
          break;
        case '1 month':
          modifiedMin = moment().subtract(1, 'M').toJSON();
          break;
        case '1 year':
          modifiedMin = moment().subtract(1, 'y').toJSON();
          break;
        case '':
          modifiedMin = '';
          break;
      }
      console.log(modifiedMin);
      this.props.fetchData({modifiedMin: modifiedMin, offset:0});
    }

    clearSearch() {
        //document.getElementById('supplier').value='';
        //document.getElementById('materialid').value='';
        window.location = path;
    }

	renderAuthorities() {
		var options = this.props.authorities.slice(0);
		options.unshift({'AssetGroupId':'', 'CmppId': '', 'Name': 'All'});
		return options.map((authority) => {
            return (
                <Radio key={authority.CmppId} value={authority.AssetGroupId} id={authority.CmppId} >
                    {authority.Name}
                </Radio>
            );
		});
	}

  renderStatuses() {

    var statuses = [
      {id: 'ALL'},
      {id:'RUNNING'},
      {id: 'SUCCEEDED'}
    ]

    return statuses.map((status) => {
      return (
          <Radio key={status.id} value={status.id} id={status.id}>{status.id}</Radio>
      );
    });

  }

    renderContentTypes() {
        const obj = this.props.contentTypes;
        var options =  Object.keys(obj).map(function(key) {
            return {
                value: key,
                name: key,
                count: obj[key]
            };
        });
        options.unshift({value: '', name: 'Any'});
        return options.map((type) => {
            return (
                <Radio key={type.name} value={type.value} id={type.name} >
                    {type.name}
                </Radio>
            );
        });
    }

    renderModified() {
        return this.state.modifiedOptions.map((m) => {
            return (
                <Radio key={m.name} value={m.value} id={m.name}>
                    {m.name}
                </Radio>
            );
        });
    }

	render() {

    var searchFilters = queryString.parse(location.search);

    $(document).ready(function() {
      $('#supplier').val(searchFilters.supplier);
      $('#materialid').val(searchFilters.materialid);
    })

    function getActiveStatus() {
      var status = searchFilters.status;
      if(status == undefined) { status = 'ALL';}
      return status;
    }

    return (
      <paper-card id="advanced_search">
        <div className="header">
          <h3><i className="fa fa-search"></i> SEARCH</h3>
        </div>

        <div className="card-content">
          <div className="search-section" id="basic">
            <div className="content">
              <input id="materialid" type="text" className="form-control" placeholder="Name or Material ID" maxLength="30" onChange={this.change} data-key="materialID"/>
            </div>
          </div>

          <div className="search-section">
            <div>
              <h4 className="heading" onClick={(e)=>{this.toggle(e, '#collapse1')}}>Status</h4>
              <div id="collapse1" className="collapse_content" tabIndex="0">
                <div className="content">
                  <RadioGroup name="status" onChange={({target: {value}})=>{this.setStatus(value)}} value={getActiveStatus()} className="search-text">
                    {this.renderStatuses()}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="search-section">
            <div data-collapse>
              <h4 className="heading" onClick={(e)=>{this.toggle(e, '#collapse2')}}>Supplier</h4>
              <div id="collapse2" className="collapse_content" tabIndex="0">
                <div className="content">
                  <input id="supplier" type="text" className="form-control" placeholder="Supplier" maxLength="30" onChange={this.changeSupplier} />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <a className="btn btn-default btn-clear" href="#" onClick={this.clearSearch}><span>Clear Filters </span><i className="fa fa-times"></i></a>
          </div>
        </div>
      </paper-card>
    )
  }
}

/*
<div className="search-section">
            <div data-collapse>
              <h4 className="heading" onClick={(e)=>{this.toggle(e, '#collapse3')}}>Last Updated</h4>
              <div id="collapse3" className="collapse_content" tabIndex="0">
                <div className="content">
                  <RadioGroup name="modified" onChange={({target: {value}})=>{this.setModified(value)}} value={this.state.modified} className="search-text">
                    {this.renderModified()}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
*/

Search.propTypes = {

};

/**
 * All this function does is, it takes a piece of the application state and data from the store
 * And passes it into the component as properties.
 * So this component can access whatever piece of state and data it wants from the store.
*/

const mapStateToProps = (state) => {
    return {

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

    };
};

// export just the default means you only exporting the dumb component that does not know anything about the application Data.
// export default tasksLists;

/**
 * In order to connect our component to the store, we use to use Connect.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Search);

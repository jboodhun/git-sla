import React, { Component } from 'react';
import { connect } from 'react-redux';

class Updated extends Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.timeDiff = this.timeDiff.bind(this);
    this.isLoading = this.isLoading.bind(this);

    this.state = {
      'updateDisplay': ''
    }
  }

  componentDidMount() {
    this.setRefreshInterval();
  }

  setRefreshInterval() {
    this.clearRefreshInterval();
    setInterval(this.refresh, 5000);
    this.refresh();
  }

  clearRefreshInterval() {
    clearInterval(this._refreshInterval);
  }

  refresh() {
    console.log('Refreshing ...');
    this.setState({'updateDisplay': this.timeDiff(this.props.updated)});
  }

  componentWillUnmount() {
    clearInterval(this._refreshInterval);
  }



  timeDiff( datetime ) {

    var datetime = typeof datetime !== 'undefined' ? datetime : moment().format();

    var datetime = new Date( datetime ).getTime();
    var now = new Date().getTime();

    if( isNaN(datetime) )
    {
        return "";
    }

    if (datetime < now) {
        var milisec_diff = now - datetime;
    }else{
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date( milisec_diff );

    function pad(num) {
        return parseInt(num) >= 10 ? parseInt(num) : '0'+parseInt(num);
    }

    return 'Updated: '+pad(date_diff.getMinutes()) + " Mins " + pad(date_diff.getSeconds()) + " Secs ago";
  }

  isLoading() {
    if(this.props.reposIsLoading) {
      return <i className={'fa fa-refresh fa-spin'}></i>;
    } else {
      return this.state.updateDisplay;
    }
  }


  render() {

    return (
      <span className="updated">
        {this.isLoading()}
      </span>
    );
  }
}

Updated.propTypes = {

};

/**
 * All this function does is, it takes a piece of the application state and data from the store
 * And passes it into the component as properties.
 * So this component can access whatever piece of state and data it wants from the store.
*/
const mapStateToProps = (state) => {
  return {
    updated: state.timeUpdated,
    reposIsLoading: state.reposIsLoading
  };
};

/**
 * In order to connect our component to the store, we use to use Connect.
*/
export default connect(mapStateToProps)(Updated);

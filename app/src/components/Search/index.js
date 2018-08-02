import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(event) {
    var regex = new RegExp('\\b\\w*' + event.target.value + '\\w*\\b');
    $('.repo').hide().filter(function () {
        return regex.test($(this).data('name'))
    }).show();
  }

  render() {
    return (
      <input type="text" id="search" name="search" className="form-control" placeholder="Search ..." onChange={this.search}/>
    );
  }
}

export default Search;

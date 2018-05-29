// Imports
import React from 'react';
import './SearchBar.css';

// Create <SearchBar /> ['React'(Component)]
class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleTermChange(e){
    this.setState({
      term: e.target.value
    });
  }

  handleSearch(){
    this.props.onSearch(this.state.term);
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
            onKeyPress={this.handleEnter}
            onChange={this.handleTermChange}
            placeholder="Enter a Song Title, Artist, or Album ..." />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

// Exports
export default SearchBar; // <SearchBar />

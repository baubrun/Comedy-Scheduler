import React from "react";


const SearchBar = props => {
    return (
      <div>
        <form className="search-bar">
          <label id="search-label" htmlFor="search"></label>
          <input
            id="search"
            onChange={props.handleSearchInput}
            placeholder="SEARCH"
            value={props.searchInput}
            type="text"
          />
        </form>
      </div>
    );
  }


export default SearchBar
import React from "react";


const SearchBar = props => {
    return (
      <div>
        <form>
          <label htmlFor="search">Search</label>
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
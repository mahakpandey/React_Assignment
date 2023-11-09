import React from "react";
import { useState } from "react";
import serachIcon from '../../assets/search.png'

const SearchBar = ({ getSearchData }) => {
  const [search, setSearch] = useState();
  const handleChange = (e) => {
    getSearchData(e.target.value.trim());
  };

  return (
    <>
      <div className="searchBar">
        <input
          className="inputStyle"
          type="text"
          placeholder="Search..."
          onChange={handleChange}
        />
        <img className="searchImg" src={serachIcon} alt="" />
      </div>
    </>
  );
};

export default SearchBar;

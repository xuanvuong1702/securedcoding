import SearchIcon from '@mui/icons-material/Search';
import { Input, Typography } from "antd";
import React from 'react';
import './SearchWithinNav.css';
const { Search } = Input;
const SearchWithinNav = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div
      className='search-within-nav-container'
    >
      <div className="search-within-nav-header">
        <SearchIcon className="search-within-icons" />
        <Typography className="search-within-label">
          Search Within
        </Typography>
      </div>
      <div className="search-within-nav-body">
        <Search placeholder="Search Within Current Results" onSearch={onSearch} style={{ width: '100%' }} />
      </div>
    </div>
  )
}

export default SearchWithinNav
import React from 'react'
import NavBarCpn from './NavBar'
import MainResultCpn from './MainResults'
import "./SearchResult.css"

const SearchResultCpn = () => {
  return (
    <div className='search-result-container'>
      <div className="nav-bar-cpn">
        <NavBarCpn />
      </div>
      <div className="main-result-cpn">
        <MainResultCpn />
      </div>
    </div>
  )
}

export default SearchResultCpn
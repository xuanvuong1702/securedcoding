import React from 'react';
import SuggestionsNav from './SuggestionsNav';
import SearchWithinNav from './SearchWithinNav';
import FiltersNav from './FiltersNav';
import './NavBarCpn.css';

const NavBarCpn = () => {
  return (
    <div className='nav-bar-cpn-container'>
      <SuggestionsNav />
      <SearchWithinNav />
      <FiltersNav />
    </div>
  )
}

export default NavBarCpn
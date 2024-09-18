import React from 'react'
import './MainResultCpn.css';
import AppliedFilters from './AppliedFilters';
import CurrentSearchQuery from './CurrentSearchQuery';
import TableSearchQuery from './TableSearchQuery';

const MainResultCpn = () => {
  return (
    <div
      className='main-result-cpn-container'
    >
      <AppliedFilters />
      <CurrentSearchQuery />
      <TableSearchQuery />
    </div>
  )
}

export default MainResultCpn
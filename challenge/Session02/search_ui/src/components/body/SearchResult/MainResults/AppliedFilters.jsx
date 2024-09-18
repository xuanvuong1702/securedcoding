import React from 'react';
import './MainResultCpn.css';
import { Typography } from 'antd';

const AppliedFilters = () => {
  return (
    <div
      className='applied-filters-container'
    >
      <Typography.Text level={4}
        className='applied-filters-title'
      >
        Applied Filters:
      </Typography.Text>
      <Typography.Text
        className='applied-filters-text'
      >
        No filters applied
      </Typography.Text>

    </div>
  )
}

export default AppliedFilters
import React from 'react';
import './ListOfCases.css';
import { Typography, Select } from 'antd';
import { displayOptions, fakeDataListOfCases, sortingOptions } from '../../../../../constant/constants';
import CasesCommon from '../../../../../common/CasesCommon';

const ListOfCases = () => {

  const handleChangeDisplay = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeSort = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div
      className='list-of-cases-container'
    >
      <div className='list-of-cases-sort-box'>
        <div className='list-of-cases-box-result'>
          <Typography>
            <b>10</b> cases found
          </Typography>
          <Typography>
            (includes 0 with globel awards)
          </Typography>
        </div>
        <div className='list-of-case-box-control'>
          <div
            className='list-of-case-display-control'
          >
            <Typography>
              Display Summary Options:
            </Typography>
            <Select
              defaultValue="hideAll"
              style={{
                width: '100%',
                marginRight: '12px'
              }}
              onChange={handleChangeDisplay}
              options={displayOptions}
            />
          </div>
          <div
            className='list-of-case-sort-control'
          >
            <Typography>
              Results Sorting Options:
            </Typography>
            <Select
              defaultValue="relevance"
              style={{
                width: '100%',
                marginRight: '12px',
              }}
              onChange={handleChangeSort}
              options={sortingOptions}
            />
          </div>
        </div>
      </div>
      <div className="list-of-case-display-details">
        {
          fakeDataListOfCases.map((value) => {
            return (
              <CasesCommon value={value} key={value.id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListOfCases
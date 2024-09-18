import { Typography } from 'antd'
import React from 'react'
import './MainResultCpn.css';
import InfoIcon from '@mui/icons-material/Info';

const CurrentSearchQuery = () => {
  return (
    <div
      className='current-search-container'
    >
      <div>
        <Typography.Text level={4}
          className='current-search-title'
        >
          Current Search Query:
        </Typography.Text>
        <InfoIcon sx={{ mr: 1, fontSize: '20px' }} />
        <Typography.Text
          className='current-search-text'
        >
          tags.level3:"Ankle - Sprain"
        </Typography.Text>
      </div>
      <div>
        <Typography.Text level={4}
          className='current-search-title'
        >
          Nature Of Injury:
        </Typography.Text>
        <InfoIcon sx={{ mr: 1, fontSize: '20px' }} />
        <Typography.Text
          className='current-search-text'
        >
          {`Lower Limb > Ankle > Sprain`}
        </Typography.Text>
      </div>
    </div>
  )
}

export default CurrentSearchQuery
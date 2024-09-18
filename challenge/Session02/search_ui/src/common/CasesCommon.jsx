import { Collapse, Typography } from 'antd';
import React, { useState } from 'react';
import './CasesCommon.css';

const { Panel } = Collapse;

const CasesCommon = (props) => {
  const [expandedKeys, setExpandedKeys] = useState(null);

  const handleCheckOption = (item) => {
    setExpandedKeys(item);
  }

  return (
    <div>
      <Typography className="casescommon-title">
        {props.value.title}
      </Typography>
      <div
        className='case-common-details-container'
      >
        {
          props.value.options.map((option) => {
            return (
              <Collapse activeKey={expandedKeys} accordion={false}
                onChange={handleCheckOption}
                className='case-common-box'
              >
                <Panel header={option.label} key={option.label}
                  className='case-common-panel'
                >
                  <Typography
                    className='case-common-text'
                  >
                    {option.text}
                  </Typography>
                </Panel>
              </Collapse>
            )
          })
        }
      </div>
    </div>
  )
}

export default CasesCommon
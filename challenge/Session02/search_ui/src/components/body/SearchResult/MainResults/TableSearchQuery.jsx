import { Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { dataTab } from '../../../../constant/constants';

const { TabPane } = Tabs;

const TableSearchQuery = () => {
  return (
    <div
      className='table-search-query-container'
    >
      <Tabs
        defaultActiveKey="0"
        centered
        size='large'
      >
        {
          dataTab.map((value) => {
            return (
              <TabPane
                key={value.id}
                tab={
                  <span>
                    <value.icon sx={{ mr: 1 }} />
                    {value.name}
                  </span>
                }>
                <value.children />
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  )
}

export default TableSearchQuery
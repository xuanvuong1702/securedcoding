import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { Collapse, List, Typography } from "antd";
import React, { useState } from 'react';
import './SuggestionsNavbar.css';
const { Panel } = Collapse;

const SuggestionsNav = () => {
  const [selectedList, setSelectedList] = useState(null);

  const handleListClick = (listName) => {
    setSelectedList(listName);
  };

  const renderListItems = (listName) => {
    // ? Render error list item?
    const items = ["Item 1", "Item 2", "Item 3"];
    return items.map((item, index) => (
      <Typography.Text key={index} style={{ color: "red" }}>{`${index + 1
        }. ${item}`}</Typography.Text>
    ));
  };

  return (
    <div
      className="suggestions-nav-container"
    >
      <div className="suggestions-nav-header">
        <WbIncandescentIcon className="suggestions-icons"
        />
        <Typography className="suggestions-label">
          Suggestions
        </Typography>
      </div>
      <div className="suggestions-nav-body">
        <Collapse accordion activeKey={selectedList} onChange={handleListClick}
          className='suggestions-panel-box'
        >
          <Panel header="Did You Mean ?" key="Did You Mean ?"
            className='suggestions-panel-item'
          >
            {selectedList === "Did You Mean ?" &&
              renderListItems("Did You Mean ?")}
            <List.Item className="modal-sugges">
              <Typography.Text strong>1.</Typography.Text>{" "}
              <Typography.Text className="red-text">cargo hand</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>2.</Typography.Text>{" "}
              <Typography.Text className="red-text">hand, wrist, and fingers</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>3.</Typography.Text>{" "}
              <Typography.Text className="red-text">hand - abrasions</Typography.Text>
            </List.Item>
          </Panel>
          <Panel header="Body Proximity Terms" key="Body Proximity Terms"
            className='suggestions-panel-item'
          >
            {selectedList === "Body Proximity Terms" &&
              renderListItems("Body Proximity Terms")}
            <Typography.Text strong>Where "eyelid" is found</Typography.Text>
            <List.Item className="modal-sugges">
              <Typography.Text strong>1.</Typography.Text>{" "}
              <Typography.Text className="red-text">eye</Typography.Text>
            </List.Item>
            <Typography.Text strong>Nearby Body Parts</Typography.Text>
            <List.Item className="modal-sugges">
              <Typography.Text strong>1.</Typography.Text>{" "}
              <Typography.Text className="red-text">eyebrow</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>2.</Typography.Text>{" "}
              <Typography.Text className="red-text">eyelash</Typography.Text>
            </List.Item>
          </Panel>
          <Panel header="Related Medical Terms" key="Related Medical Terms"
            className='suggestions-panel-item'
          >
            {selectedList === "Related Medical Terms" &&
              renderListItems("Related Medical Terms")}
            <List.Item className="modal-sugges">
              <Typography.Text strong>1.</Typography.Text>{" "}
              <Typography.Text className="red-text">Item 1</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>2.</Typography.Text>{" "}
              <Typography.Text className="red-text">Item 2</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>3.</Typography.Text>{" "}
              <Typography.Text className="red-text">Item 3</Typography.Text>
            </List.Item>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default SuggestionsNav
import React, { useState } from "react";
import { Button, Modal, Collapse, Typography, List } from "antd";
import "./ModalSugges.css";
import { AlertOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const ModalSugges = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleListClick = (listName) => {
    setSelectedList(listName);
  };

  const renderListItems = (listName) => {
    // ? Render error list item?
    const items = ["Item 1", "Item 2", "Item 3"];
    return items.map((item, index) => (
      <Typography.Text key={index} style={{ color: "red" }}>{`${
        index + 1
      }. ${item}`}</Typography.Text>
    ));
  };

  return (
    <div
    >
      <Button onClick={showModal}  style={{
        width: "100%",
      }}>
        <AlertOutlined /> Suggestions
      </Button>
      <Modal
        title="Search Suggestions"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse accordion activeKey={selectedList} onChange={handleListClick}>
          <Panel header="Did You Mean ?" key="Did You Mean ?">
            {selectedList === "Did You Mean ?" &&
              renderListItems("Did You Mean ?")}

            <List.Item className="modal-sugges">
              <Typography.Text strong>1.</Typography.Text>{" "}
              <Typography.Text className="red-text">cargo hand</Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>2.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                hand, wrist, and fingers
              </Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>3.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                abrasion on right hand
              </Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>4.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                hand - abrasions
              </Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>5.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                contusion of right hand
              </Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>6.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                hand -bruise
              </Typography.Text>
            </List.Item>
            <List.Item className="modal-sugges">
              <Typography.Text strong>7.</Typography.Text>{" "}
              <Typography.Text className="red-text">
                abrasion on both hands
              </Typography.Text>
            </List.Item>
          </Panel>
          <Panel header="Body Proximity Terms" key="Body Proximity Terms">
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
          <Panel header="Related Medical Terms" key="Related Medical Terms">
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
      </Modal>
    </div>
  );
};

export default ModalSugges;

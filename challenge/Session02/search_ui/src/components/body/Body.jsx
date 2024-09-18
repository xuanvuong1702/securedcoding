import {
  Button,
  Layout,
  List,
  Typography,
  theme,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { SearchResultsList } from "./SearchBar/SearchResultList";
import Header from "../header/Header";
import "./Body.css";
const { Content, Footer } = Layout;

const App = () => {
  const options = [
    {
      value: "Head",
      label: "Head",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "Lower Limb",
      label: "Lower Limb",
      children: [
        {
          value: "Ankle",
          label: "Ankle",
          children: [
            {
              value: "Discover All Cases Tagged With Ankle",
              label: "Discover All Cases Tagged With Ankle",
            },
            {
              value: "Sprain",
              label: "Sprain",
            },
            {
              value: "Strain",
              label: "Strain",
            },
            {
              value: "Crushing Injury",
              label: "Crushing Injury",
            },
            {
              value: "Fracture",
              label: "Fracture",
            },
            {
              value: "Tear to Tendon",
              label: "Tear to Tendon",
            },
            {
              value: "Tear to Ligament",
              label: "Tear to Ligament",
            },
          ],
        },
        {
          value: "Discover All Cases Tagged With Lower Limb",
          label: "Discover All Cases Tagged With Lower Limb",
        },
        {
          value: "Upper Leg",
          label: "Upper Leg",
        },
        {
          value: "Knee",
          label: "Knee",
        },
        {
          value: "Lower Leg",
          label: "Lower Leg",
        },
        {
          value: "Foot, Heel, and Toes",
          label: "Foot, Heel, and Toes",
        },
        {
          value: "Confusion, Abrasion, Laceration, Scars",
          label: "Confusion, Abrasion, Laceration, Scars",
        },
        {
          value: "Loss of Limbs, Leg or Foot Amputation",
          label: "Loss of Limbs, Leg or Foot Amputation",
        },
        {
          value: "Other Lower Limb Injuries",
          label: "Other Lower Limb Injuries",
        },
      ],
    },
    {
      value: "Neck and Cervical Spine",
      label: "Neck and Cervical Spine",
    },
    {
      value: "Back, Thoracic and Lumbar Spine",
      label: "Back, Thoracic and Lumbar Spine",
    },
    {
      value: "Upper Limb",
      label: "Upper Limb",
    },
    {
      value: "Torso and Internal Organs",
      label: "Torso and Internal Organs",
    },
    {
      value: "Lower Limb",
      label: "Lower Limb",
    },
    {
      value: "Miscellaneous",
      label: "Miscellaneous",
    },
    {
      value: "Psychiatric",
      label: "Psychiatric"
    }
  ];

  const [selectedItem1, setSelectedItem1] = useState();
  const [selectedItem2, setSelectedItem2] = useState();
  const [selectedItem3, setSelectedItem3] = useState();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [results, setResults] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isClicked, setIsClicked] = useState(0);
  const onChange1 = (value) => {
    setSelectedItem1(value);
    setSelectedItem2(undefined);
    setSelectedItem3(undefined);
    setIsClicked(1);
  };

  const onChange2 = (value) => {
    setSelectedItem2(value);
    setSelectedItem3(undefined);
    setIsClicked(2);
  };

  const onChange3 = (value) => {
    setSelectedItem3(value);
    setIsClicked(3);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    setToggleIcon(!toggleIcon); // Toggle the icon state
  };
  const handleSearch = () => {
    // Perform the search logic here

    // After the search is completed, set the searchCompleted state to true
    setSearchCompleted(true);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log();
  });
  return (
    <Layout className="layout">
      <Header />
      <Content style={{backgroundColor: "#e2dfdb"}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#e2dfdb"
          }}
        >
          <Typography.Title level={4} style={{fontSize:"25px"}}>
            Search injury cases
          </Typography.Title>
          <div>
            <Button type="text" onClick={toggleSearchInput}>
              Other Search Options{" "}
              {toggleIcon ? <UpOutlined /> : <DownOutlined />}{" "}
            </Button>
          </div>
        </div>
        <div
            style={{
              padding: "0 50px",
            }}
        >
          <SearchBar setResults={setResults} onSearch={handleSearch} />
          <SearchResultsList
              results={results}
              isSearchCompleted={searchCompleted}
          />
        </div>
        <div
          style={{
            background: colorBgContainer,
          }}
        >
          <div style={
            {
              display: "flex",
              flexDirection:"row",
              width:"100%",
              height:"100%",
              minHeight:"100vh",
              borderTop:" 1px solid #000",
              borderBottom:" 1px solid #000",
              padding:" 20px ",
              backgroundColor:"#e2dfdb"
            }
          }>
            <div>

            </div>
            <List
              className="col-4"
              style={{background:"#fff"}}
              header={<h4>Level 1</h4>}
              bordered
              dataSource={options}
              renderItem={(item) => (
                <List.Item
                  onClick={() => onChange1(item)}
                  style={{ cursor: "pointer" }}
                >
                  <Typography.Text >{item.value}</Typography.Text>
                </List.Item>
              )}
            />
            {selectedItem1 && (
              <List
                className="col-4"
                style={{background:"#fff"}}
                header={<h4>Level 2</h4>}
                bordered
                dataSource={selectedItem1.children}
                renderItem={(item) => (
                  <List.Item
                  onClick={() => onChange2(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography.Text >{item.value}</Typography.Text>
                  </List.Item>
                )}
              />
            )}
            {selectedItem2 && (
              <List
                className="col-4"
                style={{background:"#fff"}}
                header={<h4>Level 3</h4>}
                bordered
                dataSource={selectedItem2.children}
                renderItem={(item) => (
                  <List.Item
                  onClick={() => onChange3(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography.Text >{item.value}</Typography.Text>
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        CMCG 2023
      </Footer>
    </Layout>
  );
};

export default App;

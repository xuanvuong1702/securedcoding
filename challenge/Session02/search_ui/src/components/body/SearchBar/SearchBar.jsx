import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Modal, AutoComplete } from "antd";
import {
  SearchOutlined,
  HistoryOutlined,
  SaveOutlined,
  ToolOutlined,
  EyeOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import ModalSugges from "../SearchResult/Modal/ModalSugges";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../../../constant/constants";
import { getListSearchHistory } from "../../../services/search/searchHistory.services";

export const SearchBar = ({ setResults, onSearch }) => {
  const [input, setInput] = useState("");
  const [isSaveSearch, setIsSaveSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  // const [popularKeywords, setPopularKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const autoCompleteRef = useRef();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery([QUERY_KEY.HISTORY_RESULTS], () =>
      getListSearchHistory()
  );
  //
  // console.log(data, isLoading);

  const fetchData = (value) => {
    if (value.trim() !== "") {
      // Simulating API call delay with setTimeout
      setTimeout(() => {
        const apiSuggestions = ["Result 1", "Result 2", "Result 3"];
        const filteredSuggestions = apiSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (value) => {
    setInput(value);
    if (isInputFocused) {
      fetchData(value);
    }
  };

  const handleSaveSearch = () => {
    setIsSaveSearch(true);
  };


  const handleEnterPress = () => {
    if (input.trim() !== "") {
      handleSaveSearch();
    }
  };

  const handleInputFocus = (value) => {
    setIsInputFocused(true);
    fetchData(value);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleMouseEnter = () => {
    setIsInputHovered(true);
  };

  const handleMouseLeave = () => {
    setIsInputHovered(false);
  };

  const options = [
    // {
    //   label: "Popular Keywords",
    //   options: popularKeywords.map((keyword, index) => ({
    //     value: keyword,
    //     label: <div key={`popular-${index}`}>{keyword}</div>,
    //   })),
    // },
    {
      label: "Search History",
      options: searchHistory.map((keyword, index) => ({
        value: keyword,
        label: (
          <div key={`history-${index}`}>
            {keyword}
            <HistoryOutlined style={{ marginLeft: "8px" }} />
          </div>
        ),
      })),
    },
    {
      label: "API Results",
      options: suggestions.map((keyword, index) => {
        const highlightedText = keyword.replace(
          new RegExp(`(${input})`, "gi"),
          '<span class="highlight">$1</span>'
        );
        return {
          value: keyword,
          label: (
            <div key={`result-${index}`}>
              <span
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              ></span>
            </div>
          ),
        };
      }),
    },
  ];

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <AutoComplete
          options={isInputFocused ? options : options.slice(0, 2)}
          onSelect={handleInputChange}
          onSearch={handleInputChange}
          value={input}
          placeholder="Search ICRS"
          onPressEnter={handleEnterPress}
          ref={autoCompleteRef}
          popupMatchSelectWidth={252}
          onFocus={() => handleInputFocus(input)}
          onBlur={handleInputBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Input
            style={{
              width: "calc(100vw - 120px)",
            }}
            suffix={<SearchOutlined />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </AutoComplete>
      </div>
      <div className="button-wrapper">
        <Button
          className="button"
          style={{ backgroundColor: "#800000", color: "#fff" }}
        >
          {" "}
          <EyeOutlined /> Discover Cases By Nature Of Injury
        </Button>
        <div className="button">
          <ModalSugges />
        </div>
        <Button
          className="button"
          onClick={() => {
            // handleSearch();
            const searchResult = input.trim();
            if (searchResult !== "") {
              navigate(`/result-details/${encodeURIComponent(searchResult)}`);
            }
          }}
        >
          <ToolOutlined /> Advanced Search
        </Button>
        <Button className="button" onClick={handleSaveSearch}>
          <SaveOutlined /> Saved Searches
        </Button>
      </div>
      <Modal
        title="History Search"
        open={isSaveSearch}
        onCancel={() => setIsSaveSearch(false)}
        onOk={() => setIsSaveSearch(false)}
      >
        Search done
      </Modal>
    </div>
  );
};

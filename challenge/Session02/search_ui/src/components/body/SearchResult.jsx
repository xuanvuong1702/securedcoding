import React from "react";
import { Button } from "antd";
import Header from "./header";
const SearchResultPage = ({ keyword }) => {

    const handleButtonClick = (buttonNumber) => {
        // Do something when a button is clicked
        console.log(`Button ${buttonNumber} clicked`);
    };

    return (
        <div>
            {/* Header */}
            <Header />

            {/* InputSearch */}
            <div className="input-search">
                <p>Keyword: {keyword}</p>
            </div>

            {/* Buttons */}
            <div className="buttons">
                <Button onClick={() => handleButtonClick(1)}>Button 1</Button>
                <Button onClick={() => handleButtonClick(2)}>Button 2</Button>
                <Button onClick={() => handleButtonClick(3)}>Button 3</Button>
                <Button onClick={() => handleButtonClick(4)}>Button 4</Button>
            </div>

            {/* Body */}
            <div className="body">
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Suggestion */}
                    <div className="suggestion">
                        <h3>Suggestion</h3>
                        {/* Add your suggestion content here */}
                    </div>

                    {/* Search Within */}
                    <div className="search-within">
                        <h3>Search Within</h3>
                        {/* Add your search within content here */}
                    </div>

                    {/* Filter */}
                    <div className="filter">
                        <h3>Filter</h3>
                        {/* Add your filter content here */}
                    </div>
                </div>

                {/* Content */}
                <div className="content">
                    {/* Applied Filters */}
                    <div className="applied-filters">
                        <p>Applied Filters: No filters applied</p>
                    </div>

                    {/* Current Search Query */}
                    <div className="current-search-query">
                        <p>Current Search Query: {keyword}</p>
                    </div>

                    {/* Nature of Injury */}
                    <div className="nature-of-injury">
                        <p>
                            Nature of Injury: Level 1 {">"} Level 2 {">"} Level
                            3
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage;

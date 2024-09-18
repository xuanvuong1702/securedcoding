import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AdvancedSearch from '../pages/AdvanceSearch';
import DetailSearch from '../pages/DetailsSearch';

const Root = () => {
  return (
    <Routes>
      <Route element={<AdvancedSearch />} path="/" />
      <Route path="/result-details/:searchResult" element={<DetailSearch />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default Root;

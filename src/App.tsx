import React from 'react';
import './App.css';

// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/store';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NestedList from './components/CheckBoxList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NestedList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './input.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/NavBar';
import SignUp from './components/Signup';
import ApolloProvider from './ApolloProvider';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </ApolloProvider>
);
reportWebVitals();

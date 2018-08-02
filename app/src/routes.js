// ./src/index.jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route} from 'react-router';


const routes = {
  '/': 'Home',
  '/home': '',
  '/workflow': 'Workflow'
};

export default routes;

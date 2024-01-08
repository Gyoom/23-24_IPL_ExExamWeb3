import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLoader from 'components/App/AppLoader';
import { BrowserRouter as Router } from 'react-router-dom'

import 'index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AppLoader />
    </Router>
);

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes/AdminRoutes';
import WebRoutes from './routes/WebRoutes/WebRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<WebRoutes />} />
      </Routes>
    </Router>
  )
}

export default App

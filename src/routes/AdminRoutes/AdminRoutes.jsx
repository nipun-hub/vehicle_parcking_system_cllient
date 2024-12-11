import React, { useContext } from 'react';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { adminRouterList } from './AdminRouterList';
import { AuthContext } from '../../context/AuthContext';


const AdminRoutes = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" replace />;
  } else {
    if (token.role !== "ADMIN") {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <>
      <AdminLayout>
        <Routes>
          {!token.token && navigate('/sss')}
          {
            adminRouterList.map((obj, i) => {
              return (
                <Route key={i} path={obj.path} Component={obj.Component} />
              )
            })
          }
        </Routes>
      </AdminLayout>
    </>
  );
};

export default AdminRoutes;
// App.js
import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Body from './Components/Layout/Body';
import LoginPage from './Components/Layout/LoginPage';
import ProtectedRoute from './Route/ProtectedRoute';
import CurrentUsers from './graphql_withoutcodegen/Queries/CurrentUser';
import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import Loader from 'react-js-loader';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const [{ data, fetching, error } ] = useQuery({ query: CurrentUsers });
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (!fetching && data && data.currentUser) {
      dispatch({ type: 'SET_USER', payload: data.currentUser});
    }
  },  [fetching,dispatch,data]);

  
  return (
    <> 
    <ToastContainer/>
    {fetching ? 
    <div style={{position:'fixed',top : '42%', left:'47%' }}>
      <Loader type="bubble-ping" bgColor='skyblue' size={700}/>
    </div>
      :
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="/body" element={<Body />} />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to='login'/>}/>
      </Routes>
    </BrowserRouter>}
    </>
  );
}

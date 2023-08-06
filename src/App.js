import './App.css';
import Login from './router/login/Login';
import NotFound from './router/not-found/NotFound';
import Layout from './router/layout/Layout';
import { Routes, Route } from "react-router-dom"
import Home from './router/home/Home';
import { ToastContainer } from 'react-toastify';
import CreateCustomer from './router/create-customer/CreateCustomer';
import CreateAdmin from './router/create-admin/CreateAdmin';
import 'react-toastify/dist/ReactToastify.css';
import Admins from './router/admins/Admins';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create-customer' element={<CreateCustomer />} />
          <Route path='/create-admin' element={<CreateAdmin />} />
          <Route path='/admins' element={<Admins />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

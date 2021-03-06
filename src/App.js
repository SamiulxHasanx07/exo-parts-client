import './App.css';
import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import Login from './shared/Auth/Login';
import Register from './shared/Auth/Register';
import Resetpass from './shared/Auth/Resetpass';
import { ToastContainer } from 'react-toastify';
import Purchase from './pages/Purchase';
import RequireAuth from './shared/Auth/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Dashboard/Orders';
import AddReview from './pages/Dashboard/AddReview';
import UpdateProfile from './pages/Dashboard/UpdateProfile';
import MyProfile from './pages/Dashboard/MyProfile';
import RequireAdmin from './shared/Auth/RequireAdmin';
import AddProduct from './pages/Dashboard/AddProduct';
import MakeAdmin from './pages/Dashboard/MakeAdmin';
import ManageOrders from './pages/Dashboard/ManageOrders';
import ManageProducts from './pages/Dashboard/ManageProducts';
import EditProduct from './pages/Dashboard/EditProduct';
import Payment from './pages/Dashboard/Payment';
import Blog from './pages/Blog';
import MyPortfolio from './pages/MyPortfolio';

function App() {
  const location = useLocation();
  const pathValidate = location.pathname.includes('/dashboard');

  return (
    <div className="App">
      <div className="drawer drawer-end">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className={`w-full navbar bg-primary lg:px-48 ${pathValidate ? 'hidden' : ''}`}>

            <div className="flex-1 px-2 mx-2">
              <Link to='/'><h2 className='text-3xl font-bold text-white'>Exo Parts</h2></Link>
            </div>
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <Navbar />
              </ul>
            </div>
          </div>
          {/* <!-- Page content here --> */}

          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='home' element={<Home></Home>}></Route>
            <Route path='blog' element={<Blog></Blog>}></Route>
          <Route path='myportfolio' element={<MyPortfolio></MyPortfolio>}></Route>
            <Route path='purchase/:id' element={
              <RequireAuth>
                <Purchase />
              </RequireAuth>
            } />


            <Route path='/dashboard' element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }>
              <Route path='orders' element={<Orders></Orders>}></Route>
              <Route path='payment/:id' element={<Payment></Payment>}></Route>
              <Route path='addreview' element={<AddReview></AddReview>}></Route>
              <Route path='myprofile' element={<MyProfile></MyProfile>}></Route>
              <Route path='updateprofile' element={<UpdateProfile></UpdateProfile>}></Route>

              <Route path='addproduct' element={
                <RequireAdmin>
                  <AddProduct/>
                </RequireAdmin>
              }></Route>
              <Route path='makeadmin' element={
                <RequireAdmin>
                  <MakeAdmin/>
                </RequireAdmin>
              }></Route>
              <Route path='manageorders' element={
                <RequireAdmin>
                  <ManageOrders/>
                </RequireAdmin>
              }></Route>
              <Route path='manageproducts' element={
                <RequireAdmin>
                  <ManageProducts/>
                </RequireAdmin>
              }></Route>
              <Route path='editproducts/:id' element={
                <RequireAdmin>
                  <EditProduct/>
                </RequireAdmin>
              }></Route>
            </Route>

            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='resetpass' element={<Resetpass />}></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>

          {
            pathValidate ? '' : <Footer />
          }

          <ToastContainer />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
            <Navbar />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

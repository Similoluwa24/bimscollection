
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/pages/Header'
import Details from './components/Details'
import Banner from './components/pages/Banner'
import Product from './components/pages/Product'
import FeaturedProduct from './components/pages/FeaturedProduct'
import TopSelling from './components/pages/TopSelling'
import Cart from './components/pages/Cart'
import About from './components/pages/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Footer from './components/Footer'
import { EcomProvider } from './context/EcomContext'
import Checkout from './components/pages/Checkout'
import Alert from './components/Alert'
import { useEffect, useState } from 'react'
import Loaders from './components/Loaders'
import useLocalStorage from './hooks/useLocalStorage'
import { AuthProvider } from './context/AuthContext'
import Confirmation from './components/pages/Confirmation'
import AdminLayouts from './components/admin/AdminLayouts'
import Dashboard from './components/admin/Dashboard'
import AdminProducts from './components/admin/AdminProducts'
import Orders from './components/admin/Orders'
import Transactions from './components/admin/Transactions'
import Customers from './components/admin/Customers'
import AdminSiderbar from './components/admin/AdminSidebar'




 

function App() {
 const {getItem}  = useLocalStorage("auth-token");
 const token = getItem("auth-token");
 const authInitialToken = { accessToken : token ?? null }
 const [loader, setLoader]=useState(true)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoader(false)
    }, 3000)

    return ()=> timer;
  },[])
  return (
    <>
    {loader ? <Loaders/>:(
    <AuthProvider defaultState={authInitialToken}>
    <EcomProvider>
      <Router>
        {/* <Header/> */}
        <Alert />
         <Routes>
          <Route path='/' element={
            <>
            <Header/>
            <Banner/>
            <FeaturedProduct/>
            <TopSelling />
            </>
          }/>
          <Route path='/cart' element={
            <>
            <Header/>
            <Cart/>
            </>
            } />
          <Route path='/product' element={
            <>
            <Header/>
            <Product/>
            </>
            } />
           <Route path='/details/:id' element={
            <>
            <Header/>
            <Details/>
            </>
            }/> 
           {/* <Route path='/details/:id' element={<Details/>}/>  */}
           <Route path='/about' element={
            <>
            <Header/>
            <About/>
            </>
            }/>
           <Route path='/login'element={
            <>
            <Header/>
            <Login/>
            </>
            } />
           <Route path='/signup' element={
            <>
            <Header/>
            <Signup/>
            </>
            }/>
           <Route path='/checkout' element={
            <>
            <Header/>
            <Checkout/>
            </>
            }/>
           <Route path='/thankyou' element={<Confirmation/>}/>
           <Route path='/admin' element={<AdminLayouts/>}/>
           <Route path='/admin/dashboard' element={
            <>
            
            <Dashboard/>
            </>
            } /> 
           <Route path='/admin/product' element={
            <>
            <AdminProducts/>
            </>
            } />  
           <Route path='/admin/customers' element={
            <>
            <Customers/>
            </>
            } /> 
           <Route path='/admin/orders' element={
            <>
            <AdminSiderbar/>
            <Orders/>
            </>
            } />
           <Route path='/admin/transaction' element={
            <>
            <AdminSiderbar/>
            <Transactions/>
            </>
            } /> 
        </Routes> 
        
        <Footer/>
      </Router>
      </EcomProvider>
      </AuthProvider>
    )}
    </>
  )
}

export default App

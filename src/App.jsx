import { useEffect, useState } from 'react'
import './App.css'
import NavMenu from './components/NavMenu'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ViewProduct from './Axios/ViewProduct'
import AddProduct from './Axios/AddProduct'
import Home from './Axios/Home'
import axios from 'axios';
import Cart from './Axios/Cart'
import UsercontextProvider from './context/UsercontextProvider'


function App() {

  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [edtData, setEdtData] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    getCartData();
  }, [])


  const editData = (val) => {
    setEdtData(val)
    navigate("/addProduct")
  }

  const getData = async () => {
    try {
      let data = await axios.get("http://localhost:3000/products");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`)
      getData()
    } catch (error) {
      console.error("error in deleting product")
    }
  }

  const addProduct = async (product) => {
    try {
      await axios.post("http://localhost:3000/products", product);
      getData()
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const updateProduct = async (product) => {
    try {
      let id = product.id;
      let payload = {
        title: product.title,
        price: product.price,
        img: product.img
      }
      await axios.patch(`http://localhost:3000/products/${id}`, payload);
      getData()
      navigate("/viewProduct")
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const resetEdtData = () => {
    setEdtData({});  // Reset the edtData to empty object after update
  };

  const getCartProduct = async (id) => {
    try {
      let data = await axios.get(`http://localhost:3000/products/${id}`);
      addToCartFun(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addToCartFun = async (product) => {
    try {
      await axios.post("http://localhost:3000/cart", product);
      getCartData();
    } catch (error) {
      console.log(error);
    }
  }

  const getCartData = async () => {
    try {
      let data = await axios.get("http://localhost:3000/cart");
      setCartProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCartProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      getCartData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <UsercontextProvider>
      <NavMenu count={cartProduct.length} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/viewProduct' element={<ViewProduct products={products} editData={editData} deleteData={deleteData} addToCartFun={getCartProduct} />} />
        <Route path='/addProduct' element={<AddProduct addProductFun={addProduct} edtData={edtData} updateProduct={updateProduct} resetEdtData={resetEdtData} />} />
        <Route path='/cart' element={<Cart cartProduct={cartProduct} deleteCart={deleteCartProduct} />} />
      </Routes>
      </UsercontextProvider>
    </>
  )
}

export default App

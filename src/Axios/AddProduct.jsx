import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AddProduct = ({ addProductFun, edtData, updateProduct, resetEdtData }) => {
  const [product, setProduct] = useState({})
  const [err, setErr] = useState({})
  const [isEdtdata, setIsEdtdata] = useState(false)

  function handleInput(val) {
    let { name, value } = val.target;
    setProduct({ ...product, [name]: value })
  }

  useEffect(() => {
    if ((Object.keys(edtData).length > 0 && edtData.id)) {
      setProduct({ ...edtData });
      setIsEdtdata(true);
    } else {
      setProduct({});
      setIsEdtdata(false);
    }
    console.log(edtData);
    
  }, [edtData]);

  function handleValidation() {
    let tempError = {};
    if (!product.title) tempError.title = "Add title";
    if (!product.price) tempError.price = "Add price";
    if (!product.img) tempError.img = "Add Image";
    setErr(tempError);
    return Object.keys(tempError).length !== 0;
  }

  async function submtForm() {
    if (handleValidation()) return;

    if (isEdtdata) {
      await updateProduct(product);
      resetEdtData();  // Reset edtData in the parent component after update
    } else {
      addProductFun(product);
    }

    setProduct({});
    setErr({});
  }

  return (
    <section>
      <div className="container pb-3">
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="form-container">
              <h2 className="text-center">{isEdtdata ? 'Edit Product' : 'Add Product'}</h2>
              <form method='post' className="form border px-3 py-4 rounded-4" onSubmit={(e) => { e.preventDefault() }}>
                {err.title ? <label>{err.title}</label> : null}
                <input type="text" className='form-control' placeholder='Enter Product' name='title' value={product.title || ""} onChange={handleInput} />
                {err.price ? <label>{err.price}</label> : null}
                <input type="text" className='form-control my-3' placeholder='Enter Price' name='price' value={product.price || ""} onChange={handleInput} />
                {err.img ? <label>{err.img}</label> : null}
                <input type="text" className='form-control my-3' placeholder='Enter Image link' name='img' value={product.img || ""} onChange={handleInput} />
                <button type='submit' onClick={submtForm} className='btn btn-primary'>{isEdtdata ? 'Update' : 'Add'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
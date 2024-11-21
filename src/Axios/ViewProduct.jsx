import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import userContext from '../context/userContext';

const ViewProduct = ({ products, addToCartFun, deleteData, editData }) => {
  const propData = products || [];
  const { currentuser } = useContext(userContext);  // Corrected to match the context provider

  return (
    <section>
      <div className="container pb-3">
        <div className="row gy-3" style={{}}>
          {
            propData.map((val, index) => (
              <div className="col-4" key={index}>
                <Card style={{ width: '100%' }} className='border-0 viewProductCard'>
                  <img height="190px" style={{ objectFit: 'contain' }} variant="top" src={val.img} />
                  <Card.Body>
                    <Card.Title>{val.title}</Card.Title>
                    <Card.Text>
                      {val.price}
                    </Card.Text>
                    <div className="buttons">
                      <Button variant="primary" className='py-1' onClick={() => addToCartFun(val.id)} >Add to Cart</Button>
                      {
                        currentuser.role == "Admin" && (
                          <div className='d-inline'>
                            <Button variant="danger" className='ms-1 py-1' onClick={() => deleteData(val.id)} >Delete</Button>
                            <Button variant="warning" className='ms-1 py-1' onClick={() => editData(val)} >Edit</Button>
                          </div>
                        )
                      }
                    </div>

                  </Card.Body>
                </Card>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default ViewProduct;
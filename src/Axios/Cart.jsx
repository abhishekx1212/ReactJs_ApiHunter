import React from 'react'
import { Button, Card } from 'react-bootstrap';

const Cart = ({cartProduct,deleteCart}) => {

  let cartData = cartProduct || [];  

  return (
    <section>
        <div className="container">
            <div className="row gy-3">
            {
                cartData.length != 0?(
                    cartData.map((val,index)=>(
                        <div className="col-4" key={index}>
                            <Card style={{ width: '100%' }} className='shadow' >
                            <Card.Img variant="top" src={val.img} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                <Card.Text>
                                    {val.price}
                                </Card.Text>
                                <Button variant="danger" onClick={()=>deleteCart(val.id)} >Remove</Button>
                            </Card.Body>
                            </Card>
                        </div>
                    ))
                ):(
                    <h1 className='text-center'>Cart is empty</h1>
                )
            } 
            </div>
        </div>
    </section>
  )
}

export default Cart

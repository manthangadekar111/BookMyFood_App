import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('useremail'))
        await fetch("http://localhost:5000/api/myOrder", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('useremail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])



    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div>
                                                    {arrayData.Order_date ? <div className='mt-5 text-white  p-2 fw-bold text-center rounded-3 w-100 bg-dark '>
                                                        {"Order Date : " + new Date(arrayData.Order_date).toLocaleDateString()} <br />
                                                        {"Order Time : " + new Date(arrayData.Order_date).toLocaleTimeString()}
                                                        <hr />
                                                    </div> :
                                                        <div className='d-flex flex-row mt-5 flex-wrap'>
                                                            <div className='card'>
                                                                <div className='col-12 col-md-6 col-lg-3'>
                                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                        <img src={arrayData.img} className="card-img-top" alt='...' style={{ height: "100px", objectFit: "fill" }} />
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                <span className='m-1'>{"qty : " + arrayData.qty}</span>
                                                                                <span className='m-1'>{"size:  " + arrayData.size}</span>
                                                                                <span className='m-1'>{!data.Order_date}</span>
                                                                                <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                    ₹{arrayData.price}/-
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}

                </div>
            </div>
            <Footer />
        </div>
    )
}


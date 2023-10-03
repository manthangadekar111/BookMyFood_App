import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCard } from './ContextReducer';
// import fooddata from '../foodData2';

export default function Card(props) {
  // let data = useCard();
  const priceRef = useRef();
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  let options = props.options;
  let priceOptions = options ? Object.keys(options) : [];
  let dispatch = useDispatchCard();

  const handleaddtocard = async () => {

    await dispatch({
      type: "ADD", id: props.fooddata.id, name: props.fooddata.name,
      price: finalPrice, qty: qty, size: size
    })
  }
  
    useEffect(() => {
      setsize(priceRef.current.value)
    }, [])

    let finalPrice = qty * parseInt(options[size]);

    return (
      <div><div className='col-lg-4 col-md-6 col-sm-12' id='cardlist'>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.fooddata.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.fooddata.name}</h5>
            <p className="card-text">{props.fooddata.cardText}</p>
            <div className='container w-100'>
              <select className='m-2 h-100 bg-success rounded' onClick={(e) => setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onClick={(e) => setsize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} id='addtocard' onClick={handleaddtocard}>add to card</button>
          </div>
        </div>
      </div></div>
    )
  }

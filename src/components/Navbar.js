import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from '../modal';
import Cart from '../screen/Cart';
import { useCard } from './ContextReducer';
export default function Navbar() {
  const navigate = useNavigate();
  const [cardview, setcardview] = useState(false);
  let data = useCard();

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("useremail");
    navigate('/');
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">BookMyFood</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active mx-3 fs-5" aria-current="page" to="/">Home</Link>
                </li>

                {(localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5 mx-3" aria-current="page" to='/myOrder'>My Order</Link>
                  </li>
                  : ""}
              </ul>
              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex login'>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                </div>
                : <div>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setcardview(true) }}>
                    My Card
                    <Badge pill bg="danger">{data.length}</Badge>
                  </div>

                  {cardview ? <Modal onClose={() => setcardview(false)}><Cart /></Modal> : ""}
                  <div className='btn bg-danger text-white mx-2' onClick={handlelogout}>Logout</div>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.js';
import Card from '../components/card';
import { foodcatogory } from "../foodCategory";
import fooddata from "../foodData2";


export default function Home(props) {
  const [search, setsearch] = useState("");

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ "zIndex": "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
             
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?momos" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pastry" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodcatogory.map((c) => {
          const filteredItems = fooddata.filter((item) => (item.CategoryName === c.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())));
          return (

            <div key={c.id} className='row mb-3'>
              <div className='m-3 fs-3 text-white'>{c.CategoryName}</div>
              <hr />
              {filteredItems.length > 0 ? (
                filteredItems.map((filteritem) => (
                  <div key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card fooddata={filteritem}
                      options={filteritem.options[0]}

                    ></Card>

                  </div>
                ))
              ) : (
                ""
              )}
            </div>

          );
        })}
      </div>

      <div><Footer /></div>
    </div>
  )
}

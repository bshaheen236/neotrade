// eslint-disable-next-line import/no-duplicates
import React from "react";
// eslint-disable-next-line import/no-duplicates
import { useEffect, useState } from "react";
// import Sidenav from "./Sidenav";
import { notification, markAsRead, getContactInfobyDate } from "../services/contact";

export default function Notification() {
  const [Notification, setNotification] = useState([]);
  // const [PNotification, setPNotification] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  useEffect(() => {
    notification().then((res) => {
      
        // setPNotification(res.data)
        setNotification(res.data);
    });
  }, []);

  const filterByStartDate=(e)=>{
    
    setStartDate(e.target.value)
    // let filteredData = []
    // filteredData = PNotification.filter((el)=> el.time.split("T")[0] === e.target.value)
    // setNotification(filteredData)
  }

  const filterByEndDate = (e) => {
    
    setEndDate(e.target.value)
  }

  const handleDateOnClick = () => {
    getContactInfobyDate(startDate, endDate)
      // .then(res => {
      //   console.log(res);
      // })
  }

  return (
    <div>
      {/* <Sidenav /> */}
      <div
        className="py-4 border-bottom text-center pb-4 text-white mt-5"
        style={{ background: "#b8565f" }}
      >
        <h1 className="pt-2">Contact Request</h1>
      </div>
      <input type="date" onChange={filterByStartDate}/>
      <input type="date" onChange={filterByEndDate}/>
    
      <button onClick={ handleDateOnClick}
      type="button"    >Set</button>
      <div className="row  pb-2  justify-content-center " style={{width:"90%"}}>
        <div className="col-sm-2 text-center fw-bold">Date</div>
        <div className="col-sm-2 text-center fw-bold ">Name</div>
        <div className="col-sm-2 text-center fw-bold">Email</div>
        <div className="col-sm-2 text-center fw-bold">Mobile</div>
        <div className="col-sm-2 text-center fw-bold">Message</div>
        <div className="col-sm-2 text-center fw-bold">Action</div>

        {Notification?.map(item =>
        <div className="row pt-2 border-top bg-light" key={item._id}>
            <div className="col-sm-2 text-center">
            
            <p className="card-text"> {item.time.split("T")[0]}</p>
            </div>
            <div className="col-sm-2 text-center" >
            <p className="card-text ">{item.fullName}</p>
            </div>
            <div  className="col-sm-2 text-center ">
            <p>{item.email}</p>
            </div>
            <div className="col-sm-2  text-center">
            <p>{item.phone}</p>
            </div>
            <div className= "col-sm-2  text-center">
            <p>{item.message}</p>
            </div>
            <div className= "col-sm-2  text-center">
              {!item.markasread ?  <button  type="button" onClick={()=>{
               
                  markAsRead(item._id).then((res) => {

                    // console.log("sadhfashdghadd",res);
                    setNotification(res.data);
                });
            }}>Mark As Read</button> : ""}
           
            </div>
        </div>
        )}

          
        </div>
      </div>
    
  );
}

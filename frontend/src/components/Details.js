// import React from "react";
// import { getUserById } from "../services/user";

// export default function Details() {

//     const [getuserdata, setUserdata] = useState([]);
//     console.log(getuserdata);

//     const { id } = useParams("");
//     console.log(id,"hiiiiiiiiiiiiiiiiiiiii");
// 	getUserById(id).then((res) => {
//     console.log(res,"jjjjjjjjjjjjjjjjjjjj")

//         setUserdata(res.data.data);
//     });

//   return (
//     <div className="container mt-3">
//             <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

//             <Card sx={{ maxWidth: 600 }}>
//                 <CardContent>
//                     {/* <div className="add_btn">
//                         <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
//                         <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
//                     </div> */}
//                     <div className="row">
//                         <div className="left_view col-lg-6 col-md-6 col-12">
//                             <img src="/profile.png" style={{ width: 50 }} alt="profile" />
//                             <h3 className="mt-3">Name: <span >{getuserdata.fname}</span></h3>
//                             <h3 className="mt-3">Age: <span >{getuserdata.lname}</span></h3>
//                             <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
//                             <p className="mt-3"><WorkIcon />Occuption: <span>{getuserdata.phone}</span></p>
//                         </div>

//                     </div>

//                 </CardContent>
//             </Card>
//         </div>
//   )
// }

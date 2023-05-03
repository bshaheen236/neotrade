import React from "react"



import { Link } from "react-router-dom";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { notification } from "../services/contact";

export default function NotificationModal() {
    const [notificationsCount, setNotificationCount] = React.useState(0)
    React.useEffect(() => {
        notification()
        .then((res) => {
            let count = 0
            res.data.map((el)=>{
              count += !el.markasread ? 1 : 0 
              return count;
            })
            
            setNotificationCount(count);
        });
    }, [])
    
  return (
    <Dropdown as={ButtonGroup}>
    

    <Dropdown.Toggle split variant="white" id="dropdown-split-basic"   />

    <Dropdown.Menu>

      <Dropdown.Item href="#/action-1">
        <Link to="/Notification">Contact {notificationsCount}</Link> </Dropdown.Item>
        
      <Dropdown.Item href="#/action-1">
        <Link to="/">KYC</Link> </Dropdown.Item>
    
    </Dropdown.Menu>
  </Dropdown>
   
			
  )
}

import React, { useEffect } from "react";
import './Practice.css'
import axios from "axios";
const Practice = () => {

  useEffect(() => {
    document.cookie = "username=JohnDoe; phonenumber=988454585; expires=Fri, 2 Sep 2024 20:00:59 GMT; path=/";
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'test_user_1',
        body: 'bar',
        userId: 39434,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="parent">
      <div className="innerContainer" as='span'>

      </div>
    </div>
  );
};

export default Practice;

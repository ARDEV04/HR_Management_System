import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Rightstyle.css";
import Calender from "./Calender";
function RightSection() {
  const today = new Date();
  // const currentTime = today.getHours()>=9 && today.getHours<=10;
  const currentTime = 9.5;

  const [isMarkerVisible, setIsMarkerVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (currentTime >= 9 && currentTime <= 10) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [currentTime]);


  const markAttendance = async () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    try {
      const response = await axios.post('apiurl', { date });
      console.log(response.data);
      handleButtonClick();
    } catch (error) {
      console.error(error);
      handleButtonClick();
    }
  };
  const markAbsent = async () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    try {
      const response = await axios.post('apiurlabsx', { date });
      console.log(response.data);
      handleButtonClick();
    } catch (error) {
      console.error(error);
      handleButtonClick();
    }
  };


  const handleButtonClick = () => {
    setIsMarkerVisible(!isMarkerVisible);
    const calenderElement = document.querySelector(
      ".RightSection .container .calender"
    );
    calenderElement.classList.toggle("blur"); // Toggle blur on the calender element
  };

  return (
    <div className="RightSection">
      <div className="head">
        <span>Attendence Portal</span>
      </div>
      <div className="container">
        {isButtonVisible && (
          <div className="btn">
            <button onClick={handleButtonClick}>Mark your attendance</button>
          </div>
        )}
        <Calender />
        <div
          className="marker"

          style={{ display: isMarkerVisible ? "block" : "none"}}
        >
          <div className="closeMarker">
            <button onClick={handleButtonClick}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="textContainer"style={{Color: 'black' }}>
            <h2>Hello!! Please Mark Your Today's Attendance</h2>
          </div>
          <div className="markerButtons">
            <div className="leftButton">
              <button onClick={markAttendance}>Present</button>
            </div>
            <div className="rightButton">
              <button onClick={markAbsent}>Absent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSection;

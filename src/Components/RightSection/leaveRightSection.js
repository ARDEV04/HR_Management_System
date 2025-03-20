import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Rightstyle.css";
import Calender from "./Calender";
import "./leaveRightSection.css";
function RightSection() {
  const [leaveData, setLeaveData] = useState(null);
  const [approvedData, setApprovedData] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isConfirmerVisible, setConfirmerVisible] = useState(false);
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    leaveType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("apiurl"); // Replace "apiurl" with the actual API URL
        setLeaveData(response.data.leave); // Replace "leave" with the actual property name
        setApprovedData(response.data.approved); // Replace "approved" with the actual property name
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (Object.values(formData).every((field) => field !== "")) {
      setFormVisible(false);
      setConfirmerVisible(true);
    } else {
      alert("Please fill all fields !!");
    }
  };

  const handleConfirm = async () => {
    // Submit the form data here
    console.log(formData);

    try {
      const response = await axios.post("apiurl", formData); // Replace 'apiurl' with your API endpoint
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setConfirmerVisible(false);
    setFormVisible(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="RightSection">
      <div className="head">
        <span>Leave Management</span>
      </div>
      <div className="container">
        <div className="indicator">
          <div className="display">
            <div className="remainingLeave">
              <div className="displayText">Leaves Remaining :</div>
              <div className="displayNum">{leaveData ? leaveData : " N/A"}</div>
            </div>
            <div className="takenLeave">
              <div className="displayText">Leaves Taken :</div>
              <div className="displayNumtaken">
                {approvedData ? approvedData : " N/A"}
              </div>
            </div>
          </div>
          <div className="applier">
            <div className="button1">
              <button onClick={() => setFormVisible(true)}>Apply Leave</button>
            </div>
            <div className="button2">
              <button onClick={() => setHistoryVisible(true)}>
                Leave History
              </button>
            </div>
          </div>
          {/* ------------making form invisible------ */}
          {isFormVisible && (
            <div className="modal">
              <div className="modal-content">
                {/* Your form JSX goes here */}
                <div className="leaveForm">
                  <div className="closeMarker">
                    <button onClick={() => setFormVisible(false)}>
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="formText">Please Fill This Form :</div>
                  <form onSubmit={handleSubmit}>
                    <div className="datesInput">
                      <div className="fromDate">
                        <label>
                          <div>From :</div>
                          <input
                            type="date"
                            name="fromDate"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div className="toDate">
                        <label>
                          <div>To :</div>
                          <input
                            type="date"
                            name="toDate"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="reason">
                      <label>
                        <div className="reasonText">Reason:</div>
                        <textarea name="reason" onChange={handleChange} />
                      </label>
                    </div>

                    <div className="type">
                      <div className="typeText">Type of Leave:</div>
                      <div className="typeLabel">
                        <label>
                          <input
                            type="radio"
                            value="Sick"
                            name="leaveType"
                            onChange={handleChange}
                          />{" "}
                          Sick
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="Vacation"
                            name="leaveType"
                            onChange={handleChange}
                          />{" "}
                          Vacation
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="Personal"
                            name="leaveType"
                            onChange={handleChange}
                          />{" "}
                          Personal
                        </label>
                      </div>
                    </div>
                    <div className="submitButton" onClick={handleChange}>
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {isConfirmerVisible && (
            <div className="modal">
              <div className="modal-content">
                {/* Your confirmer JSX goes here */}
                <div className="confirmer">
                  <div className="closeMarker">
                    <button
                      onClick={() => {
                        setConfirmerVisible(false);
                        setFormVisible(true);
                      }}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="text">Are You Sure ?</div>
                  <div className="button">
                    <button onClick={handleConfirm}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isHistoryVisible && (
            <div className="modal">
              <div className="modal-content">
                <div className="history">
                  <div className="hitoryCloser">
                    <button onClick={() => setHistoryVisible(false)}>
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Calender />
      </div>
    </div>
  );
}

export default RightSection;

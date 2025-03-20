import React, { useEffect, useState } from "react";

function Calender() {

  const currentRealYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentRealYear - 1899 },
    (_, i) => i + 1900
  );

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentIndex, setcurrentIndex] = useState(currentMonth - 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [firstDayOfMonth, setfirstDayofMonth] = useState(
    new Date(currentYear, currentMonth - 1, 1)
  );
  const [dayOfWeek, setdayOfWeek] = useState(firstDayOfMonth.getDay());

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const noofDays = {
    January: 31,
    February: isLeapYear(currentYear) ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Week = [
    {
      full: "Sunday",
      logo: "S",
    },
    {
      full: "Monday",
      logo: "M",
    },
    {
      full: "Tuesday",
      logo: "T",
    },
    {
      full: "Wednesday",
      logo: "W",
    },
    {
      full: "Thursday",
      logo: "T",
    },
    {
      full: "Friday",
      logo: "F",
    },
    {
      full: "Saturday",
      logo: "S",
    },
  ];
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const SetWidthAuto = () => {
    setwindowWidth(window.innerWidth);
    const headRow = document.getElementsByClassName("head_row")[0];
    const weekDays = document.querySelectorAll(".week-day");
    const date_box = document.querySelectorAll(".day_box");
    const width = headRow.offsetWidth;
    const dayWidth = width / 7;
    weekDays.forEach((day) => {
      day.style.width = dayWidth + "px";
    });
    date_box.forEach((day) => {
      day.style.width = dayWidth + "px";
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const OpenCloseDropMenu = () => {
    const options = document.getElementsByClassName("options")[0];
    if (options.style.display === "none" || options.style.display === "") {
      options.style.display = "block";
      setIsDropdownOpen(true);
    } else {
      options.style.display = "none";
      setIsDropdownOpen(false);
    }
  };

  // const OpenCloseDropMenu = () => {
  //   const options = document.getElementsByClassName("options")[0]
  //   if (options.style.display === "none" || options.style.display === "") {
  //     options.style.display = "block"
  //   } else {
  //     options.style.display = "none"
  //   }
  // }

  //   const Open_Close_Options = () => {
  //     const symbol = document.getElementsByClassName("down_btn")[0]

  //     if (openclose_id.className === "fa-solid fa-chevron-left") {
  //         menu_id.style.width = "0px"
  //         menu_id.className = "Menu close"
  //         menu_open_close.style.right = "-20px"
  //         setTimeout(()=>{
  //             setisopen(false)
  //         },200)
  //     } else {
  //         menu_id.style.width = "80px"
  //         menu_id.className = "Menu open"
  //         menu_open_close.style.right = "-10px"
  //         setTimeout(()=>{
  //             setisopen(true)
  //         },300)
  //     }
  // }

  const SetDropDownYear = (item) => {
    setCurrentYear(item);
    const options = document.getElementsByClassName("options")[0];
    options.style.display = "none";
  };

  const [Leftdays, setLeftDays] = useState(
    35 - noofDays[months[currentIndex]] - dayOfWeek
  );

  useEffect(() => {
    SetWidthAuto();

    window.addEventListener("resize", SetWidthAuto);

    return () => {
      window.removeEventListener("resize", SetWidthAuto);
    };
  }, []);

  const ChangeMonth = (id) => {
    let newCurrentIndex = currentIndex + id;
    if (newCurrentIndex < 0) {
      newCurrentIndex = 11;
    } else if (newCurrentIndex >= 12) {
      newCurrentIndex = 0;
    }

    setcurrentIndex(newCurrentIndex);

    const newFirstDayOfMonth = new Date(currentYear, newCurrentIndex, 1);
    setfirstDayofMonth(newFirstDayOfMonth);

    const newDayOfWeek = newFirstDayOfMonth.getDay();
    setdayOfWeek(newDayOfWeek);

    setLeftDays(35 - noofDays[months[newCurrentIndex]] - newDayOfWeek);
  };

  useEffect(() => {
    ChangeMonth(0);
  }, [currentYear]);

  return (
    <div className="calender">
      <div className="min_container">
        <div className="cal_setting">
          <div className="month">
            <div className="left">
              <button
                onClick={() => {
                  ChangeMonth(-1);
                }}
              >
                <i class="fa-solid fa-angle-left"></i>
              </button>
            </div>
            <div className="mid">
              <p>
                {months[currentIndex]} {currentYear}
              </p>
            </div>
            <div className="right">
              <button
                onClick={() => {
                  ChangeMonth(1);
                }}
              >
                <i class="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="year">
            <div className="selected">
              <p>{currentYear}</p>
            </div>
            <div className="down_btn">
              <button onClick={OpenCloseDropMenu}>
                {" "}
                <i
                  class={`fa-solid fa-angle-${isDropdownOpen ? "up" : "down"}`}
                ></i>
              </button>
            </div>
            <div className="options">
              <ul>
                {years.map((item, id) => (
                  <li
                    key={id}
                    onClick={() => {
                      SetDropDownYear(item);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="cal_sheet">
          <div className="head_row">
            {Week.map((day, index) => (
              <div key={index} className="week-day">
                <span>{windowWidth >= 800 ? day.full : day.logo}</span>
              </div>
            ))}
          </div>
          {console.log(Leftdays)}
          <div className="date_box">
            {Array.from({ length: 35 }, (_, index) => {
              const currentDate = new Date().getDate();
              const currentMonth = new Date().getMonth() + 1;
              const Year = new Date().getFullYear();
              const today= new Date();

              return (
                <div
                  key={index}
                  className="day_box"
                  style={{
                    backgroundImage:
                      index - dayOfWeek + 1 === currentDate &&
                      currentIndex + 1 === currentMonth &&
                      currentYear === Year
                        ? "linear-gradient(to right, #329Ba5 0%, #293273  51%, #0D2530  100%)"
                        : "initial",
                    color:
                      index - dayOfWeek + 1 === currentDate &&
                      currentIndex + 1 === currentMonth &&
                      currentYear === Year
                        ? "whitesmoke"
                        : "black",
                  }}
                >
                  {index - dayOfWeek >= 0 &&
                  index + 1 - dayOfWeek <= noofDays[months[currentIndex]] ? (
                    <span>{index + 1 - dayOfWeek}</span>
                  ) : (
                    Leftdays + index < 0 && (
                      <span>
                        {noofDays[months[currentIndex]] + Leftdays + index + 1}
                      </span>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calender;

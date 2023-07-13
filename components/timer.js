import React, { useState, useEffect } from 'react';

export default function Timer({ setTimerZero, firstClick, refresh }) {
  const [timeLeft, setTimeLeft] = useState(1500); // The initial time is set at 15 seconds, in 100th of seconds

  useEffect(() => {
    if (firstClick) {
        const endTime = new Date().getTime() + timeLeft * 10;
        const intervalId = setInterval(() => {
            const now = new Date().getTime(); // The timer is run by comparing the current date to the date when the timer should stop
            if ((endTime - now) > 0) {
                setTimeLeft(Math.floor((endTime - now) / 10)); // As long as there is time left, timeLeft is set to the number of 100th of seconds left
            } else {
                setTimeLeft(0);
                setTimerZero(true);
                clearInterval(intervalId); // When the timer reaches zero, the setInterval() stops and timerZero is set to true
            }
        }, 10); // The setInterval() calls the function every 10 milliseconds (every 100th of seconds)
    } else { 
        setTimeLeft(1500);
    }
  }, [firstClick]); // When the user clicks for the first time, the timer starts moving. When firstClick is set back to false, timeLeft is set back to 1500

  return (
    <div>
      <h2 className="timer">{timeLeft < 1000 ? `0${Math.floor(timeLeft / 100)}` : Math.floor(timeLeft / 100)}:{timeLeft - Math.floor(timeLeft / 100)*100 < 10 ? `0${timeLeft - Math.floor(timeLeft / 100)*100}` : timeLeft - Math.floor(timeLeft / 100)*100}</h2>
    </div> // The timer displays the number of seconds and 100th of seconds left separated by ":"
  );
}
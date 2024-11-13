import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [buttonVisible, setIsButtonVisible] = useState({
    start: true,
    pause: false,
    continue: false,
  });

  const secondInterval = useRef(null);

  useEffect(() => {
    if (time.seconds === 0 && time.minutes === 0 && time.hours === 0) {
      clearInterval(secondInterval.current);
      return;
    }

    if (time.seconds < 0) {
      if (time.minutes > 0) {
        setTime((prev) => ({
          hours: prev.hours,
          minutes: prev.minutes - 1,
          seconds: 59,
        }));
      } else if (time.hours > 0) {
        setTime((prev) => ({
          hours: prev.hours - 1,
          minutes: 59,
          seconds: 59,
        }));
      }
    }
  }, [time]);

  const onStartButtonClicked = () => {
    setIsButtonVisible({ start: false, pause: true, continue: false });
    if (!secondInterval.current) {
      secondInterval.current = setInterval(() => {
        setTime((prev) => ({
          ...prev,
          seconds: prev.seconds - 1,
        }));
      }, 1000);
    }
  };

  const onPauseButtonClicked = () => {
    setIsButtonVisible({ start: false, pause: false, continue: true });
    clearInterval(secondInterval.current);
    secondInterval.current = null;
  };

  const onContinueButtonClicked = () => {
    setIsButtonVisible({ start: false, pause: true, continue: false });
    if (!secondInterval.current) {
      secondInterval.current = setInterval(() => {
        setTime((prev) => ({
          ...prev,
          seconds: prev.seconds - 1,
        }));
      }, 1000);
    }
  };

  const onResetButtonClicked = () => {
    setIsButtonVisible({ start: true, pause: false, continue: false });
    clearInterval(secondInterval.current);
    secondInterval.current = null;
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleInputChange = (e, field) => {
    const input = e.target.value;
    // Allow only two digits and ignore other input
    if (/^\d{0,2}$/.test(input)) {
      setTime((prev) => ({
        ...prev,
        [field]: input === "" ? 0 : parseInt(input, 10),
      }));
    }
  };

  return (
    <div className="App">
      <div>Count Down Timer</div>
      <div className="timer__heading">
        <span>Hours</span>
        <span>Minutes</span>
        <span>Seconds</span>
      </div>
      <div className="timer__input">
        <span>
          <input
            type="text"
            maxLength="2"
            placeholder="00"
            value={time.hours || ""}
            onChange={(e) => handleInputChange(e, "hours")}
            onBlur={(e) => {
              if (e.target.value === "") {
                setTime((prev) => ({ ...prev, hours: 0 }));
              }
            }}
          />
        </span>
        <span>:</span>
        <span>
          <input
            type="text"
            maxLength="2"
            placeholder="00"
            value={time.minutes || ""}
            onChange={(e) => handleInputChange(e, "minutes")}
            onBlur={(e) => {
              if (e.target.value === "") {
                setTime((prev) => ({ ...prev, minutes: 0 }));
              }
            }}
          />
        </span>
        <span>:</span>
        <span>
          <input
            type="text"
            maxLength="2"
            placeholder="00"
            value={time.seconds || ""}
            onChange={(e) => handleInputChange(e, "seconds")}
            onBlur={(e) => {
              if (e.target.value === "") {
                setTime((prev) => ({ ...prev, seconds: 0 }));
              }
            }}
          />
        </span>
      </div>
      <div className="timer__button">
        {buttonVisible.start && (
          <button onClick={onStartButtonClicked}>Start</button>
        )}
        {buttonVisible.continue && (
          <button onClick={onContinueButtonClicked}>Continue</button>
        )}
        {buttonVisible.pause && (
          <button onClick={onPauseButtonClicked}>Pause</button>
        )}
        <button onClick={onResetButtonClicked}>Reset</button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import UseContext1 from "./UseContext/UseContext1";

const UseEffect = () => {
  const [data, setData] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    document.title = "REACT LEARNING" + data;
  }, [data]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="use-effect-page">
      <h2>UseState Examples</h2>
      <div className="example1">
        <button onClick={() => setData(data + 1)}>{data}</button>
      </div>
      <div className="example2">
        <p>Seconds on this page :{seconds} </p>
      </div>
      <div className="usecontext-example">
        <UseContext1>Themed Button</UseContext1>
      </div>
    </div>
  );
};

export default UseEffect;

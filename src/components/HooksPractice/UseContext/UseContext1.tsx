import React, { createContext, useContext, type ReactNode } from "react";
import "../UseState.css";

export const ThemeContext = createContext("light");

const UseContext1 = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <button className={theme === "dark" ? "dark-btn" : " "}>
        {children}
      </button>
    </div>
  );
};

export default UseContext1;

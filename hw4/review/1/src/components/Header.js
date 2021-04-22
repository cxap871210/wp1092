import React, { useState } from "react";

function Header() {
  const [{ text }, setText] = useState("");

  const handleOnFocus = (e) => {
    for (let alphabet of document.getElementsByClassName("cells__alphabet")) {
      if (alphabet.id === e.target.id.substring(0, 1)) {
        alphabet.style["background"] = "#cdcdcd";
      } else {
        alphabet.style["background"] = "#e6e6e6";
      }
    }
    for (let number of document.getElementsByClassName("cells__number")) {
      if (number.id === e.target.id.substring(1)) {
        number.style["background"] = "#cdcdcd";
      } else {
        number.style["background"] = "#e6e6e6";
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Delete") {
      // e.target.value = "";
      e.target["value"] = "";
      setText("");
      // e.target.innerHTML = "";
    }
  };

  const handleEditable = (e) => {};
  return (
    <div className="cells">
      <div class="cells__spacer"></div>
      {Array.from({ length: 26 }).map((_, index) => (
        <div
          className="cells__alphabet"
          id={`${String.fromCharCode(index + 65)}`}
          key={`${String.fromCharCode(index + 65)}`}
        >
          {String.fromCharCode(index + 65)}
        </div>
      ))}
      {Array.from({ length: 100 }).map((_, index) => (
        <div className="cells__number" id={`${index + 1}`} key={`${String(index + 1)}`}>
          {index + 1}
        </div>
      ))}
      {Array.from({ length: 2600 }).map((_, index) => (
        <input
          className="cells__input"
          id={`${String.fromCharCode((index % 26) + 65)}${String(parseInt(index / 26) + 1)}`}
          key={`${String.fromCharCode((index % 26) + 65)}${String(parseInt(index / 26) + 1)}`}
          onClick={handleOnFocus}
          onKeyUp={handleKeyUp}
          ㄇ
        />
      ))}
    </div>
  );
}

export default Header;

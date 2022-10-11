import List from "./List";
import { useState } from "react";
import "./style.css";

export default function (props) {
  const [showList, setShowList] = useState(false);
  const handleClick = (txt) => {
    setShowList(false);
    props.onClick(txt);
  };
  return (
    <div className="searchable-text-container">
      <input
        onFocus={() => setShowList(true)}
        // onBlur={() => setShowList(false)}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
      {showList && (
        <List onClick={handleClick} data={props.data} input={props.value} />
      )}
    </div>
  );
}

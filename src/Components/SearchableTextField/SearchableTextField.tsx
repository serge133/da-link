import List from "./List";
import { useState } from "react";
import "./style.css";

interface Props {
  onClick: (txt: string) => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  data: string[]
}

export default function (props: Props) {
  const [showList, setShowList] = useState(false);
  const handleClick = (txt: string) => {
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

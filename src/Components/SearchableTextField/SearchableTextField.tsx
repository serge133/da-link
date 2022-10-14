import List from "./List";
import { useState, ChangeEvent } from "react";
import "./style.css";
import { Form, FormControlProps } from "react-bootstrap";

interface Props {
  onClick: (txt: string) => void;
  onChange: (txt: string) => void;
  value: string;
  placeholder: string;
  data: string[];
}

export default function (props: Props) {
  const [showList, setShowList] = useState(false);
  const handleClick = (txt: string) => {
    setShowList(false);
    props.onClick(txt);
  };
  const handleChange = (txt: string) => {
    setShowList(true);
    props.onChange(txt);
  };
  return (
    <div className="searchable-text-container">
      <Form.Control
        onFocus={() => setShowList(true)}
        onChange={(e) => handleChange(e.target.value)}
        value={props.value}
        placeholder={props.placeholder}
      />
      {showList && (
        <List
          hideList={() => setShowList(false)}
          onClick={handleClick}
          data={props.data}
          input={props.value}
        />
      )}
    </div>
  );
}

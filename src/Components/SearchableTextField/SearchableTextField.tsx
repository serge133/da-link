import List from "./List";
import { useState, ChangeEvent } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickList: (listValue: string) => void;
  value: string;
  placeholder: string;
  name: string;
  data: string[];
}

export default function (props: Props) {
  const [showList, setShowList] = useState(false);

  const handleClick = (listValue: string) => {
    setShowList(false);
    props.onClickList(listValue);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowList(true);
    props.onChange(e);
  };
  return (
    <div className="searchable-text-container">
      <Form.Control
        onFocus={() => setShowList(true)}
        onChange={handleChange}
        name={props.name}
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

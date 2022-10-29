import { ChangeEvent } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import SearchableTextField from "../../Components/SearchableTextField/SearchableTextField";
import "./ClassSearch.css";
import { DEPARTMENTS } from "../../database/schoolData";

type ClassSearchProps = {
  department: string;
  search: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickList: (listValue: string) => void;
};

const ClassSearch = (props: ClassSearchProps) => {
  return (
    <Card className="class-search-card">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Department (Required)</Form.Label>
          <SearchableTextField
            name="department"
            onClickList={props.onClickList}
            onChange={props.handleChange}
            value={props.department}
            placeholder="Department"
            data={DEPARTMENTS}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="className">
          <Form.Label>Search Anything</Form.Label>
          <Form.Control
            name="search"
            onChange={props.handleChange}
            value={props.search}
            type="text"
            placeholder="Class Name, CRN, Professor, Class ID, Anything..."
          />
        </Form.Group>
      </Form>
    </Card>
  );
};

export default ClassSearch;

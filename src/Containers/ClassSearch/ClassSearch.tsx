import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import SearchableTextField from "../../Components/SearchableTextField/SearchableTextField";
import "./ClassSearch.css";
import { DEPARTMENTS } from "../../database/schoolData";

type ClassSearchProps = {
  department: string;
  search: string;
  onChangeDepartment: (department: string) => void;
  onChangeSearch: (search: string) => void;
};

const ClassSearch = (props: ClassSearchProps) => {
  return (
    <Card className="class-search-card">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Department (Required)</Form.Label>
          <SearchableTextField
            onClick={(txt) => props.onChangeDepartment(txt)}
            onChange={(txt: string) => props.onChangeDepartment(txt)}
            value={props.department}
            placeholder="Department"
            data={DEPARTMENTS}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="className">
          <Form.Label>Search Anything</Form.Label>
          <Form.Control
            onChange={(e) => props.onChangeSearch(e.target.value)}
            value={props.search}
            type="text"
            placeholder="Class Name, CRN, Professor, Class ID, Anything..."
          />
        </Form.Group>

        <Button variant="primary">Search</Button>
      </Form>
    </Card>
  );
};

export default ClassSearch;

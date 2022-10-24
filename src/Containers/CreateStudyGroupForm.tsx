import { ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  close: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  form: {
    name: string;
    private: boolean;
  };
  onSubmit: () => void;
};

const CreateStudyGroupForm = (props: Props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Create Studygroup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Study Group Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={props.handleChange}
              value={props.form.name}
              placeholder="Your study group name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isPrivate">
            <Form.Check
              onChange={props.handleChange}
              checked={props.form.private}
              name="private"
              type="checkbox"
              label="Private"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStudyGroupForm;

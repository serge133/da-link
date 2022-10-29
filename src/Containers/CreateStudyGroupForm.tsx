import { ChangeEvent, RefObject } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  close: () => void;
  studygroupNameRef: RefObject<HTMLInputElement>;
  onSubmit: () => void;
};

const CreateStudyGroupForm = (props: Props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Create Studygroup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Study Group Name</Form.Label>
            <Form.Control
              type="text"
              ref={props.studygroupNameRef}
              placeholder="Your study group name"
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

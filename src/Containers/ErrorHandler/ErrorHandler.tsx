import { ReactNode } from "react";
import { Alert } from "react-bootstrap";
import "./ErrorHandler.css";

type Props = {
  allHasToBeTrueOrElseFail: boolean[];
  children: JSX.Element | JSX.Element[];
  errMessage: string;
};

const ErrorHandler = (props: Props): JSX.Element => {
  const allAreTrue = (): boolean =>
    props.allHasToBeTrueOrElseFail.every((el) => el);

  if (allAreTrue()) {
    return <>{props.children}</>;
  }

  return (
    <div>
      <Alert variant="danger">{props.errMessage}</Alert>
    </div>
  );
};

export default ErrorHandler;

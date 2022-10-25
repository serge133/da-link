import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar/Navbar";
import { AuthWrapper } from "../../useAuth";
import "./StudygroupDashboard.css";

type Props = {};

/**
 * When we fetch a study group we will get the information about it
 * What class it is for
 * What people are in it
 * etc.
 * So when we recieve this information we can go back a page
 */
const StudygroupDashboard = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  return (
    <AuthWrapper>
      <div className="App">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <div>
          StudygroupDashboard {crn} {department} {studygroupID}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default StudygroupDashboard;

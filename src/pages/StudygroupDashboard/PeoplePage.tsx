import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import { AuthWrapper } from "../../Contexts/useAuth";

type Props = {};

const PeoplePage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="people"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={true}
        >
          <h1>Hi this is the People page! </h1>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default PeoplePage;

import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import { AuthWrapper } from "../../Contexts/useAuth";

type Props = {};

const CalendarPage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar />
        <StudygroupDashboardContainer
          currentPage="calendar"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={false}
          allowedAccessToPage={false}
        >
          <h1>Hi this is the calendar page! </h1>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default CalendarPage;

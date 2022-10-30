import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import { AuthWrapper } from "../../Contexts/useAuth";

type Props = {};

const DiscordPage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="discord"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={false}
          allowedAccessToPage={false}
        >
          <h1>Hi this is the discord page! </h1>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default DiscordPage;

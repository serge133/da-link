import { Button, Typography } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { useNavigate, useParams } from "react-router";
import Taskboard from "../../Containers/Taskboard/Taskboard";
import { AuthWrapper } from "../../Contexts/useAuth";
import "./StudygroupDashboard.css";

// * Page ready

function TaskboardPage() {
  const { crn, department, studygroupID } = useParams();
  const navigate = useNavigate();

  const goBack = () =>
    navigate(`/studygroups/${crn}/${department}/${studygroupID}/welcome`);

  return (
    <AuthWrapper>
      <Layout className="taskboard-page">
        <Header className="header">
          <Typography.Title level={3} type="secondary">
            <Button onClick={goBack}>Back</Button> Drag & Drop Taskboard
          </Typography.Title>
        </Header>
        <Content className="content">
          <Taskboard
            crn={crn ? crn : ""}
            studygroupID={studygroupID ? studygroupID : ""}
          />
        </Content>
      </Layout>
    </AuthWrapper>
  );
}

export default TaskboardPage;

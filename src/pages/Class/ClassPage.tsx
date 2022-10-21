import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Class } from "../../Containers/ClassesDisplay/ClassesDisplay";
import { classes } from "../../database/schoolData";
import { AuthWrapper } from "../../useAuth";
import "./ClassPage.css";

type Props = {};

const ClassPage = (props: Props) => {
  const { crn, department } = useParams();
  const [classData, setClassData] = useState<Class>();

  useEffect(() => {
    const c: Class = classes[department].filter((c: Class) => c.crn === crn)[0];
    setClassData(c);
  }, [department, crn, setClassData]); // Gauranteed to not change

  return (
    <AuthWrapper>
      <div>
        <h1>{classData?.crn}</h1>
        <h1>{classData?.professor}</h1>
        <h1>{classData?.times}</h1>
        <h1>{classData?.type}</h1>
        <h1>{classData?.id}</h1>
        <h1>{classData?.className}</h1>
        <h1>{classData?.section}</h1>
      </div>
    </AuthWrapper>
  );
};

export default ClassPage;

import "./ClassesDisplay.css";
import classes from "../../database/raw/classes.json";
import { relevancy } from "../../functions/sorter";
import { useNavigate } from "react-router";
import { Class, MyClasses } from "../../database/models";
import ClassCard from "../../Components/ClassCard";

type ClassesDisplayProps = {
  department: string;
  search: string;
  toggleMyClass: (c: Class) => void;
  me: { myClasses: MyClasses };
};

const ClassesDisplay = (props: ClassesDisplayProps) => {
  const { department, search } = props;
  const navigate = useNavigate();

  const openClass = (c: Class) => {
    const url = `/class/${c.crn}/${department}/${search}`;
    navigate(url);
  };

  const rawdata: Class[] =
    // @ts-ignore
    classes && department in classes ? classes[department] : [];
  const filteredData: Class[] = relevancy(rawdata, search);
  return (
    <div className="class-carousel">
      {filteredData.map((c) => (
        <ClassCard
          crn={c.crn}
          key={c.crn}
          classCode={c.id}
          className={c.className}
          classStatus={c.classStatus}
          isMyClass={c.crn in props.me.myClasses}
          professor={c.professor}
          handleClickJoin={() => props.toggleMyClass(c)}
          handleDetailsClick={() => openClass(c)}
        />
      ))}
    </div>
  );
};

export default ClassesDisplay;

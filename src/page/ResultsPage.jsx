import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";

export default (props) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const db = getDatabase(app);
    const results = ref(db, "PHYS/users/");
    onValue(results, (snapshot) => {
      const data = snapshot.val();
      setResults(Object.values(data));
      console.log(data);
    });
  }, []);
  return (
    <div>
      {results.map((u) => (
        <div key={u["id"]}>{u["name"]}</div>
      ))}
    </div>
  );
};

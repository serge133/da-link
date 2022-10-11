import SearchableTextField from "../Components/SearchableTextField/SearchableTextField";
import Button from "react-bootstrap/Button";
export default function (props) {
  return (
    <>
      <SearchableTextField
        value={form.professor}
        onChange={(e) =>
          props.setForm({ ...props.form, professor: e.target.value })
        }
        onClick={(txt) => setForm({ ...props.form, professor: txt })}
        data={PROFESSORS}
        placeholder="Professor Name"
      />
      <SearchableTextField
        value={form.className}
        onChange={(e) => setForm({ ...form, className: e.target.value })}
        onClick={(txt) => setForm({ ...form, className: txt })}
        data={CLASSES}
        placeholder="Class Name"
      />
      {/* <input
        value={form.department}
        placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      /> */}
      <SearchableTextField
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        onClick={(txt) => setForm({ ...form, department: txt })}
        data={DEPARTMENTS}
        placeholder="Department"
      />
      <div>
        <Button variant="success" onClick={onSearch}>
          Search
        </Button>
      </div>
    </>
  );
}

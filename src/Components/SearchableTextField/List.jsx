function List(props) {
  //create a new array by filtering the original array
  const filteredData = props.data.filter((el) => {
    //if no input the return the original
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.toLowerCase().includes(props.input.toLowerCase());
    }
  });
  return (
    <ul>
      {filteredData.map((item) => (
        <li onClick={() => props.onClick(item)} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default List;

const ClassList = () => {
    const classes = ["Mathematics", "Science", "English"];
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Assigned Classes</h2>
        <ul>
          {classes.map((cls, index) => (
            <li key={index} className="p-2 border-b">{cls}</li>
          ))}
        </ul>
      </div>
    );
  };
  export default ClassList;
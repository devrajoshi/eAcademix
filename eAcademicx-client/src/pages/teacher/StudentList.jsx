const StudentList = () => {
    const students = ["John Doe", "Jane Smith", "Mark Lee"];
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Students</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index} className="p-2 border-b">{student}</li>
          ))}
        </ul>
      </div>
    );
  };
  export default StudentList;
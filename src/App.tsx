import Table from "react-bootstrap/Table";

const App = () => {
  return (
    <div className="container mx-auto px-[20px] mt-20">
      <Table striped bordered hover className=" max-w-[1200px] mx-auto">
        <thead>
          <tr >
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Active</th>
            <th>Count</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" bg-[#F2F2F2]">
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>1234556</td>
            <td className="flex items-center justify-center "><input type="checkbox"  /></td>
            <td>12</td>
            <td className="flex items-center justify-center"><button className=" text-white text-center bg-orange-500 px-3 py-2 rounded-lg">Edit</button></td>
            <td className=""><button className=" text-white text-center bg-red-500 px-3 py-2 rounded-lg">Delete</button></td>
             
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default App;

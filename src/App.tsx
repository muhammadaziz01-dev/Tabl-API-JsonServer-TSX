import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  //interface
  interface dataInterfas {
    id: number | string;
    name: string;
    lastName: string;
    phone: string;
    active: boolean;
    count: number | string;
  }

  // Data
  const [data, setData] = useState([]);

  // inputs valyuest
  const [inputName, setInputName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputCount, setInputCount] = useState("");
  const [inputActive, setInputActive] = useState(false);

  const inputNameChange = (e: any) => {
    setInputName(e.target.value);
  };

  const inputLastNameChange = (e: any) => {
    setInputLastName(e.target.value);
  };

  const inputPhoneChange = (e: any) => {
    setInputPhone(e.target.value);
  };

  const inputCountChange = (e: any) => {
    setInputCount(e.target.value);
  };

  const inputActiveChange = (e: any) => {
    setInputActive(e.isTrusted);
  };

  // Fuction get request from server
  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:8888/users");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // FUN USEEFFECT ===============================================
  useEffect(() => {
    getUsers();
  }, []);

  //function add user
  const addUsr = (e:any) => {
    e.preventDefault();
    let nevData: dataInterfas = {
      id: uuidv4(),
      name: inputName,
      lastName: inputLastName,
      phone: inputPhone,
      active: inputActive,
      count: inputCount,
    };

    axios.post(`http://localhost:8888/users`, nevData);
    setInputName("");
    setInputLastName("");
    setInputPhone("");
    setInputCount("");
    setInputActive(false);
    
    toast.success("Add user !", {
      position: "top-right",
    });

    setTimeout(() => {
      getUsers();
    }, 2000);
  };

  // function delete users
  const deletUser = (id: number | string) => {
    axios.delete(`http://localhost:8888/users/${id}`);

    // getUsers();

    toast.info("Delete user !", {
      position: "top-right",
    });

    setTimeout(() => {
      getUsers();
    }, 2000);

    //window.location.reload();
  };

  //function edit users
  const editUser = (id: number | string) => {
    alert(`"${id}" This user change feature is not yet complete`);
  };

  return (
    <div className="container mx-auto px-[20px] mt-20">
      <form
        onSubmit={addUsr}
        className="flex flex-col items-center p-3 rounded-2xl shadow-sm w-[40%] mx-auto mb-5"
      >
        <h1 className="text-[22px] font-semibold text-lime-500 mb-3 ">Form to add user</h1>
        <input
          onChange={inputNameChange}
          value={inputName}
          type="text"
          placeholder="First Name"
          className=" w-[70%] mx-auto py-2 px-3 border-2 border-[#000] mb-2 rounded-lg outline-none focus:border-lime-500"
          required
        />
        <input
          onChange={inputLastNameChange}
          value={inputLastName}
          type="text"
          placeholder="Last Name"
          className=" w-[70%] mx-auto py-2 px-3 border-2 border-[#000] mb-2 rounded-lg outline-none focus:border-lime-500"
          required
        />
        <input
          onChange={inputPhoneChange}
          value={inputPhone}
          type="tel"
          placeholder="Phone"
          className=" w-[70%] mx-auto py-2 px-3 border-2 border-[#000] mb-2 rounded-lg outline-none focus:border-lime-500"
          required
        />
        <input
          onChange={inputCountChange}
          value={inputCount}
          type="number"
          placeholder="Count"
          className=" w-[70%] mx-auto py-2 px-3 border-2 border-[#000] mb-2 rounded-lg outline-none focus:border-lime-500"
          required
        />
        <div className="flex items-chentr font-semibold gap-4 mb-2">
          <span>Active</span>
          <input type="checkbox" checked={inputActive} onChange={inputActiveChange} required />
        </div>
        <button className=" rounded-xl py-2 px-3 bg-lime-500 w-[70%] text-white text-[18px] font-semibold duration-300 hover:bg-lime-700 active:bg-lime-500">
          <i className="bi bi-person-fill-add mr-3"></i>Add
        </button>
      </form>

      {data.length > 0 ? (
        <Table striped bordered hover className=" max-w-[1200px] mx-auto">
          <thead>
            <tr>
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
            {data.reverse().map((el: dataInterfas, index) => {
              return (
                <tr key={index} className="">
                  <td>{index}</td>
                  <td>{el.name}</td>
                  <td>{el.lastName}</td>
                  <td>{el.phone}</td>
                  <td className="flex items-center justify-center ">
                    <input type="checkbox" checked={el.active} />
                  </td>
                  <td>{el.count}</td>
                  <td className="flex items-center justify-center">
                    <button
                      onClick={() => editUser(el.name)}
                      className=" text-white text-center bg-orange-500 hover:bg-orange-700 duration-200 active:bg-orange-500 px-3 py-2 rounded-lg"
                    >
                      <i className="bi bi-pencil-square mr-2"></i>Edit
                    </button>
                  </td>
                  <td className="">
                    <button
                      onClick={() => deletUser(el.id)}
                      className=" text-white text-center bg-red-500 hover:bg-red-700 duration-200 active:bg-red-500  px-3 py-2 rounded-lg"
                    >
                      <i className="bi bi-person-fill-dash mr-2"></i>Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h1 className="text-red-500 text-[30px] text-center">
          Sir, there is currently no user listed 😓, please add a user 😊
        </h1>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;

// {
//   "id": "5",
//   "name": "Beking",
//   "lastName": "Bek",
//   "phone": "123",
//   "active": true,
//   "count": 14
// }

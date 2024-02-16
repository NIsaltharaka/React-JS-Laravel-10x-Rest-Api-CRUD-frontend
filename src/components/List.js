import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const List = () => {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios('http://127.0.0.1:8000/api/allstudents');
            setUserData(result.data.results);
        } catch (error) {
            console.log('something wrong');
        }
    };


    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete(`http://127.0.0.1:8000/api/deletestudents/${id}`);
        const newUserData = userData.filter((item) => item.id !== id);
        setUserData(newUserData);
    };
    

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="container shadow p-3 mb-2 bg-white rounded">
        <h1 className="text-center mb-3 text-uppercase">User Details</h1>
        

        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                <NavLink to={`/view/${user.id}`} className="btn btn-success me-2">
                    <i className="bi bi-pencil"></i>View
                </NavLink>
                <NavLink to={`/edit/${user.id}`} className="btn btn-info me-2">
                    <i className="bi bi-pencil"></i>Edit
                </NavLink>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

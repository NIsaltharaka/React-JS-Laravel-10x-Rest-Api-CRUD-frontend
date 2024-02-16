import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const View = () => {
    const [userData, setUserData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (userId) => {
        try {
            const result = await axios(`http://127.0.0.1:8000/api/allstudents/${userId}`);
            setUserData(result.data.student); 
        } catch (error) {
            console.log('something wrong', error);
        }
    };

    //another btn to link home
    const clicktobackhandler = () =>{
        navigate('/');
    }

    return (
        <div>
            <div className="container mt-5 shadow">
                <h1 className="text-center text-uppercase">User Details</h1>

                {userData && (
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>

                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>ID:</strong> {userData.id}
                                </li>
                                <li className="list-group-item">
                                    <strong>Name:</strong> {userData.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> {userData.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Password:</strong> {userData.password}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                <div>
                  <button className="btn btn-primary mt-3 mb-3" onClick={clicktobackhandler}>
                        <i className="bi bi-house-door"></i> Back to Home
                </button>  
                </div>   
            </div>
        </div>
    );
};

export default View;

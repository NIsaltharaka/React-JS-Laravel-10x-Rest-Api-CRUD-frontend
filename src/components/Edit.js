import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const fetchUser = async (userId) => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/allstudents/${userId}`);
            setUserField(result.data.student);
        } catch (error) {
            console.log('something wrong', error);
        }
    };

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async () => {
        try {
            const result = await axios.put(`http://127.0.0.1:8000/api/updatestudents/${id}`, userField);
            navigate('/');
        } catch (error) {
            console.log('something wrong', error);
        }
    }

    const clicktobackhandler = () => {
        navigate('/');
    }

    return (
        <div>
            <div className="container mt-5 shadow">
                <h1 className="text-center text-uppercase">Edit User Details</h1>

                <form>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID:</label>
                        <input type="text" className="form-control" id="id" name="id" placeholder='id' value={id} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder='name' value={userField.name} onChange={e => changeUserFieldHandler(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder='email' value={userField.email} onChange={e => changeUserFieldHandler(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder='password' value={userField.password} onChange={e => changeUserFieldHandler(e)} />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={onSubmitChange}>Update</button>
                </form>

                <button className="btn btn-secondary mt-3 mb-3" onClick={clicktobackhandler}>
                    <i className="bi bi-house-door"></i> Back to Home
                </button>
            </div>
        </div>
    )
}

export default Edit;

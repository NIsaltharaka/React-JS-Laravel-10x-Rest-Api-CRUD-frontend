import React, { useState } from 'react';
import axios from 'axios';
import List from './List';

const Home = () => {
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    }

    const [loading, setLoading] = useState(false);

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`http://127.0.0.1:8000/api/addnew`, userField);
            console.log(response);
            setLoading(false);
        } catch (err) {
            console.log('Something wrong');
        }
    }

    return (
        <div>
            <div className="container shadow p-3 mb-1 bg-white rounded mt-5 ">
                <h1 className="text-center text-uppercase">User Form</h1>

                <form onSubmit={onSubmitChange}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={e => changeUserFieldHandler(e)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={e => changeUserFieldHandler(e)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={e => changeUserFieldHandler(e)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
            {loading && <div>Loading...</div>}
            <div>
                {/* Show the list items */}
                <List />
            </div>
        </div>
    );
}

export default Home;

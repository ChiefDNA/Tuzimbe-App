import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [fisrtname, setFirstname] = useState('');
    const [sirname, setSirname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [jobtitle,  setJobtitle]  = useState('Porter');
    const [tellNo, settellNo] = useState('');
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPasswod] =useState('');

    const handleSubmit =async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/',{
                fisrtname,
                sirname,
                username,
                email,
                jobtitle,
                address,
                tellNo,
                password,
            });
            console.log(response.data);
        } catch (error){
           // if (error.response && error.response.data){
                console.error(error.response.data);//iff response.data is defined
           // }else{
           //     console.error(error.message);
          //  }
        }
    };

    return (
        <section id="registry">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <label>FisrtName:</label>
                <input type="text" value={fisrtname} onChange={(event)=>setFirstname(event.target.value)} />
                <br />
                <label>SirName:</label>
                <input type="text" value={sirname} onChange={(event)=>setSirname(event.target.value)} />
                <br />
                <label>UserName:</label>
                <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)} />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
                <br />
                <label>JobTitle:</label>
                <select value={jobtitle} onChange={(event)=>setJobtitle(event.target.value)} >
                    <option value="Porter">Porter</option>
                    <option value="Builder">Builder</option>
                    <option value="Tracker">Tracker</option>
                    <option value="Manager">Manager</option>
                </select>
                <br />
                <label>PhysicalAddress:</label>
                <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)} />
                <br />
                <label>PoneNumber:</label>
                <input type="text" value={tellNo} onChange={(event)=>settellNo(event.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                <br />
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(event)=>setConfirmPasswod(event.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </section>
    );
};
export default Register;
import React, {useState} from 'react';

import '../App.css';
export default function SignUpForm({setToken}){


const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [err, setErr] = useState('');
const validateForm = () => {
    let isValid = true;
    if (username.length < 8) {
      setErr('Username must be at least 8 characters long.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setErr('Passwords must match.');
      isValid = false;
    } else {
      setErr('');
    }
    return isValid;
  };

  async function handleSubmit(e){
    e.preventDefault();
    try{
        const res = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        if(!res.ok) throw res;
        const data = await res.json();
        setToken(data.token);
        console.log(data)
    }
    
    catch(err){
        setErr("Error occurred while signing up.")
    }
    
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErr('');
}


    return(
        <>
        <h2>Sign Up</h2>
        {err && <p style={{color: 'red'}}>{err}</p>}
        <form className="form-container" onSubmit={handleSubmit}>
        <label>Username:{""}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>Password:{""}
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /></label>
        <label>Confirm Password:{""}
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} /></label>
        <p>{password === confirmPassword ? "" : "Passwords must match"}</p>
<button type="submit" disabled={username.length === 0 || password.length === 0 || password !== confirmPassword}>Sign Up</button>
        
    </form>
    </>
        
)
}


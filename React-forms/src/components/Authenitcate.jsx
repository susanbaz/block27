import React, { useState } from 'react';
import '../App.css';

function Authenitcate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(null); // New state for username

  async function handleClick() {
    try {
      const res = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw res;
      const data = await res.json();
      setSuccessMessage(data.message);
      setUsername(data.data.username); // Set the username from response data
    } catch (err) {
      setErrorMessage('Error occurred while authenticating.');
    }
  }

  return (
    <div className='Authenticate'>
      <h2>Authenticate</h2>
      {successMessage && (
        <>
          <p style={{ color: 'green' }}>{successMessage}</p>
          {username && <p>Welcome, {username}!</p>}
        </>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}

export default Authenitcate;

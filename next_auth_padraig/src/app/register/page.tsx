// src/app/register/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the new router from next/navigation
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter(); // Use the new router from next/navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        name,
        role,
      });

      setSuccess('User created successfully');
      // Redirect to login page or wherever you want
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="COACH">COACH</option>
            <option value="CLIENT">CLIENT</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Register;


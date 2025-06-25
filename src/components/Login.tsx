import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGlobe, FiUser, FiLock } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
  LoginContainer, 
  LoginCard, 
  LoginHeader,
  LoginForm 
} from './styles/Login.styles';

const VALID_CREDENTIALS = {
  username: "Farman123",
  password: "Farman@321"
};
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID_CREDENTIALS.username && 
        password === VALID_CREDENTIALS.password) {
      setUser({ username, isAuthenticated: true });
      navigate('/booking');
    } else {
      toast.error('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <div className="logo">
            <FiGlobe className="globe-icon" />
            <span>Almanack</span>
          </div>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <FiUser className="icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <FiLock className="icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
} 
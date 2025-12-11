import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Film, AlertCircle, CheckCircle } from 'lucide-react';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setMsg('');
    
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isNameValid || !isPasswordValid) {
      return;
    }
    
    setBusy(true);
    try {
      await signup(name, email, password);
      setMsg('Account created successfully! You are now logged in.');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (e: any) {
      const errorMsg = e?.response?.data?.error || 'Signup failed. Please try again.';
      setErr(errorMsg);
    }
    setBusy(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      paddingTop: '100px',
      position: 'relative'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1
      }} />
      
      <div style={{
        background: 'rgba(139, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        maxWidth: '450px',
        width: '100%',
        padding: '3rem',
        position: 'relative',
        zIndex: 2,
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            margin: '0 auto 1rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b0000, #dc143c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(139,0,0,0.5)'
          }}>
            <Film style={{ width: '36px', height: '36px', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            Create Account
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
            Join us to book your favorite movies
          </p>
        </div>

        {/* Error Message */}
        {err && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.2)',
            border: '1px solid #dc3545',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#ff6b6b',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            <span>{err}</span>
          </div>
        )}

        {/* Success Message */}
        {msg && (
          <div style={{
            background: 'rgba(40, 167, 69, 0.2)',
            border: '1px solid #28a745',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#51cf66',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            <span>{msg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: nameError ? '#ff6b6b' : '#999'
              }} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value) validateName(e.target.value);
                }}
                onBlur={() => validateName(name)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: `2px solid ${nameError ? '#dc3545' : '#444'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = nameError ? '#dc3545' : '#8b0000';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = nameError ? '#dc3545' : '#444';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {nameError && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '4px' }}>
                {nameError}
              </p>
            )}
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: emailError ? '#ff6b6b' : '#999'
              }} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: `2px solid ${emailError ? '#dc3545' : '#444'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = emailError ? '#dc3545' : '#8b0000';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = emailError ? '#dc3545' : '#444';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {emailError && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '4px' }}>
                {emailError}
              </p>
            )}
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: passwordError ? '#ff6b6b' : '#999'
              }} />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) validatePassword(e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: `2px solid ${passwordError ? '#dc3545' : '#444'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = passwordError ? '#dc3545' : '#8b0000';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = passwordError ? '#dc3545' : '#444';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {passwordError && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '4px' }}>
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={busy || !!emailError || !!nameError || !!passwordError}
            style={{
              width: '100%',
              padding: '1rem',
              background: busy || emailError || nameError || passwordError ? '#555' : 'linear-gradient(135deg, #8b0000, #dc143c)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: busy || emailError || nameError || passwordError ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: busy || emailError || nameError || passwordError ? 'none' : '0 4px 12px rgba(139,0,0,0.4)',
              marginTop: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!busy && !emailError && !nameError && !passwordError) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(139,0,0,0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!busy && !emailError && !nameError && !passwordError) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,0,0,0.4)';
              }
            }}
          >
            {busy ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Already have an account?
          </p>
          <a
            href="/login"
            style={{
              color: '#ff6b6b',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Sign in →
          </a>
        </div>
      </div>
    </div>
  );
}

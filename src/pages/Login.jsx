import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const { login } = useAppData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="login-brand">Giorgio Gestion</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Contraseña Administrador</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••••••"
                style={{ paddingLeft: '2.5rem', borderColor: error ? 'var(--color-danger)' : undefined }}
                autoFocus
              />
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>
            {error && <div style={{ color: 'var(--color-danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Contraseña incorrecta</div>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}

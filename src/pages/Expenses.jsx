import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

export default function Expenses() {
  const { expenses, updateExpenses } = useAppData();
  
  const [formData, setFormData] = useState({
    alquiler: expenses.alquiler || 0,
    sueldos: expenses.sueldos || 0,
    publicidad: expenses.publicidad || 0,
    servicios: expenses.servicios || 0,
    impuestos: expenses.impuestos || 0,
    deudas: expenses.deudas || 0,
    otros: expenses.otros || 0
  });

  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpenses(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const total = Object.values(formData).reduce((acc, val) => acc + val, 0);
  const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);

  return (
    <div>
      <h1>Gastos Fijos Mensuales</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        Carga tus gastos fijos una sola vez. El sistema los usará para calcular el punto de equilibrio y tus ganancias reales.
      </p>

      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="form-group flex justify-between items-center" key={key}>
              <label style={{ margin: 0, textTransform: 'capitalize', width: '150px' }}>{key}</label>
              <input 
                type="number" 
                name={key} 
                value={formData[key]} 
                onChange={handleInputChange} 
                min="0" 
                step="0.01" 
                style={{ width: 'calc(100% - 150px)' }}
              />
            </div>
          ))}
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="kpi-title">Total Gastos Fijos</div>
              <div className="kpi-value danger" style={{ fontSize: '1.5rem' }}>{formatCurrency(total)}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              {saved ? 'Guardado ✅' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

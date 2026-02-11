import React from 'react';

interface GlobeControlsProps {
  onAddPoint: () => void;
  onAddArc: () => void;
  onClear: () => void;
}

export const GlobeControls: React.FC<GlobeControlsProps> = ({
  onAddPoint,
  onClear,
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(20, 20, 30, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 10,
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <h3 style={{ 
          margin: '0 0 5px 0', 
          fontSize: '14px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          color: '#fff'
      }}>Controls</h3>
      
      <button onClick={onAddPoint} style={buttonStyle}>
        Add Test Visitor
      </button>
      
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
      
      <button onClick={onClear} style={{...buttonStyle, color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.3)'}}>
        Clear Data
      </button>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#e0e0e0',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '13px',
  fontWeight: 500,
  textAlign: 'left',
  outline: 'none'
};

// Add hover effects via class or inline logic (React inline styles are limited for pseudo-selectors)
// Ideally we would use CSS modules or styled-components, but inline is fine for this demo.
// We can assume the user will interact with it and see the native button behavior, 
// or we could add simple onMouseEnter/Leave handlers if we really wanted to perfect it.

import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="loading-wrap" role="status">
      <span className="spinner" />
      <span>{label}...</span>
    </div>
  );
}

export default LoadingSpinner;

import React from 'react';
import './Loader.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" data-testid="loading-spinner">
      </div>
    </div>
  );
}

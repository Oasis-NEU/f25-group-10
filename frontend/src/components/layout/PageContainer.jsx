import React from 'react';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div
  className={`min-h-screen ${className}`}
  style={{
        background: '#e0bebeff',
      }}
>
      {children}
    </div>
  );
};

export default PageContainer;
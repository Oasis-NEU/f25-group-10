import React from 'react';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
import React from 'react';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div
  className={`min-h-screen ${className}`}
  style={{
    background: "linear-gradient(135deg, #a64444ff 0%, #c88282ff 50%, #C74F4F 100%)"
  }}
>
      {children}
    </div>
  );
};

export default PageContainer;
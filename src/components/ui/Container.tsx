import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  maxWidth = 'lg',
  padding = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-4',
    md: 'px-4 sm:px-6 lg:px-8 py-6',
    lg: 'px-6 sm:px-8 lg:px-12 py-8'
  };

  return (
    <div className={`
      ${maxWidthClasses[maxWidth]} 
      ${paddingClasses[padding]}
      mx-auto w-full
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Container;

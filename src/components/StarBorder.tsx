import React from 'react';
import './StarBorder.css';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
  [key: string]: unknown;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  return React.createElement(
    Component,
    {
      className: `star-border-container ${className}`,
      ...rest,
      style: {
        padding: `${thickness}px 0`,
        ...rest.style
      }
    },
    React.createElement('div', {
      className: 'border-gradient-bottom',
      style: {
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }
    }),
    React.createElement('div', {
      className: 'border-gradient-top',
      style: {
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed
      }
    }),
    React.createElement('div', {
      className: 'inner-content'
    }, children)
  );
};

export default StarBorder;

import React, { CSSProperties, HTMLAttributes } from 'react';
import './StarBorder.css';

interface StarBorderProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,              // <-- separat holen
  ...divProps         // <-- Rest ohne style
}) => {
  const mergedStyle: CSSProperties = {
    padding: `${thickness}px 0`,
    ...(style ?? {}),   // <-- nur spreaden, wenn Objekt vorhanden
  };

  return React.createElement(
    Component,
    {
      ...divProps,
      className: `star-border-container ${className}`,
      style: mergedStyle,
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

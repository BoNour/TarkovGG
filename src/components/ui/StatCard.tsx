import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = 'default',
  size = 'md'
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    default: 'text-white',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  };

  // Define size classes
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className="p-4">
      <div className="text-gray-400 text-sm font-medium mb-1">{title}</div>
      <div className={`font-bold ${sizeClasses[size]} ${colorClasses[color]}`}>
        {value}
      </div>
      {subtitle && (
        <div className="text-gray-500 text-xs mt-1">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;
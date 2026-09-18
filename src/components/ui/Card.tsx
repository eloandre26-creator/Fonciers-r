import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'accent';
  id?: string;
}

export function Card({ children, className = '', variant = 'default', id, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/80 shadow-xs',
    elevated: 'bg-white border border-slate-200 shadow-sm',
    bordered: 'bg-white border-2 border-slate-200',
    accent: 'bg-emerald-950 text-white border border-emerald-800'
  };

  return (
    <div
      id={id}
      className={`rounded-xl transition-all duration-150 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`p-5 sm:p-6 pb-2 sm:pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <h3 id={id} className={`text-lg sm:text-xl font-bold tracking-tight text-slate-900 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <p id={id} className={`text-sm text-slate-600 mt-1 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`p-5 sm:p-6 pt-2 sm:pt-3 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between ${className}`}>{children}</div>;
}

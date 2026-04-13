import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label className="text-xs font-semibold uppercase tracking-tight text-zinc-600">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          className={`input-monochrome focus:ring-1 focus:ring-black ${
            error ? 'border-black bg-zinc-50' : ''
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[10px] font-medium uppercase text-black italic">
            * {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

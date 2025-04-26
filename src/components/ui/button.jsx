import React from 'react';

/**
 * Простой кнопочный компонент
 */
export function Button({ children, variant = 'solid', className = '', ...props }) {
    const base = 'px-4 py-2 rounded-2xl font-medium focus:outline-none';
    const styles =
        variant === 'outline'
            ? 'border border-gray-600 text-gray-100 hover:bg-gray-700'
            : 'bg-blue-600 text-white hover:bg-blue-700';

    return (
        <button className={`${base} ${styles} ${className}`} {...props}>
            {children}
        </button>
    );
}

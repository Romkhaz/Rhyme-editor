import React from 'react';

/**
 * Обычная обёртка-карта с тенью и скруглениями
 */
export function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`rounded-2xl shadow-md p-4 bg-gray-800 text-gray-100 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Внутренний контент карты
 */
export function CardContent({ children, className = '', ...props }) {
    return (
        <div className={`mt-2 ${className}`} {...props}>
            {children}
        </div>
    );
}

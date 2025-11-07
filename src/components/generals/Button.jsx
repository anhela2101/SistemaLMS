import React from 'react'

const VARIANT_STYLES = {
    primary: 'bg-[#132391] hover:bg-[#2DAAAD] text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500'
}

const Button = ({
    label,
    children,
    variant = 'primary',
    className = '',
    style,
    type = 'button',
    onClick,
    ...props
}) => {
    const content = children ?? label
    const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClass} ${className}`.trim()}
            style={style}
            {...props}
        >
            {content}
        </button>
    )
}

export default Button
import React, { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  helperText,
  error = false,
  iconLeft,
  iconRight,
  containerClassName = '',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors duration-200'
  const stateClasses = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-[#132391] focus:ring-[#132391] focus:border-[#132391]'
  const disabledClasses = 'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'

  const leftIconPadding = iconLeft ? 'pl-10' : ''
  const rightIconPadding = iconRight ? 'pr-10' : ''
  const iconColorClass = error ? 'text-red-500' : 'text-[#132391]'

  const renderIcon = (icon) => {
    if (!icon) return null
    if (!React.isValidElement(icon)) return icon

    return React.cloneElement(icon, {
      className: `h-5 w-5 ${iconColorClass} ${icon.props.className ?? ''}`.trim()
    })
  }

  return (
    <label className={`block ${containerClassName}`}>
      {label && (
        <span className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </span>
      )}

      <div className="relative">
        {iconLeft && (
          <span className={`absolute inset-y-0 left-3 flex items-center ${iconColorClass}`}>
            {renderIcon(iconLeft)}
          </span>
        )}

        <input
          ref={ref}
          className={`${baseClasses} ${stateClasses} ${disabledClasses} ${leftIconPadding} ${rightIconPadding} ${className}`.trim()}
          {...props}
        />

        {iconRight && (
          <span className={`absolute inset-y-0 right-3 flex items-center ${iconColorClass}`}>
            {renderIcon(iconRight)}
          </span>
        )}
      </div>

      {helperText && (
        <span className={`mt-1 block text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </span>
      )}
    </label>
  )
})

Input.displayName = 'Input'

export default Input
import * as React from "react"

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    ref={ref}
    {...props}
  />
))
Button.displayName = "Button"

export { Button }
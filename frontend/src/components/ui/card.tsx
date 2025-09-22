import * as React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div className={`border rounded p-4 ${className}`} ref={ref} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div className={`p-2 ${className}`} ref={ref} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 className={`text-lg font-bold ${className}`} ref={ref} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p className={`text-sm ${className}`} ref={ref} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div className={`p-2 ${className}`} ref={ref} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
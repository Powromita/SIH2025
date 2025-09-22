import * as React from "react"
import { Select as RadixSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

const Select = ({ className, ...props }, ref) => (
  <RadixSelect className={className} {...props} ref={ref} />
)
Select.displayName = "Select"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
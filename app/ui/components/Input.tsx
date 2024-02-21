import { cn } from '@/app/utils'
import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftLabel?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftLabel, ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        {leftLabel && (
          <span className="pointer-events-none absolute left-0 top-0 flex h-full items-center rounded-l-md border border-input bg-background p-2">
            {leftLabel}
          </span>
        )}
        <input
          type={type}
          className={cn(
            `${
              leftLabel ? 'pr-2' : 'px-2'
            } flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

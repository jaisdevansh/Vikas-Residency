import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
          {
            "bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg": variant === "primary",
            "bg-foreground text-background hover:bg-foreground/90": variant === "secondary",
            "bg-accent text-[#0f3d2e] font-bold hover:bg-accent-hover shadow-md": variant === "gold",
            "border border-primary text-primary hover:bg-primary/10": variant === "outline",
            "hover:bg-primary/10 hover:text-primary text-foreground": variant === "ghost",
            "h-10 px-6 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-md px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

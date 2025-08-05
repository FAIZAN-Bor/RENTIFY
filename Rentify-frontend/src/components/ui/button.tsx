import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95 relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-400 hover:via-green-500 hover:to-teal-600 hover:-translate-y-1 hover:scale-105 border border-emerald-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        destructive:
          "rounded-2xl bg-gradient-to-br from-rose-500 via-red-600 to-pink-700 text-white shadow-2xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/50 hover:from-rose-400 hover:via-red-500 hover:to-pink-600 hover:-translate-y-1 hover:scale-105 border border-rose-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        outline:
          "rounded-2xl border-2 border-slate-300 bg-white/80 backdrop-blur-xl text-slate-700 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-slate-100/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        secondary:
          "rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-700 text-white shadow-2xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:from-indigo-400 hover:via-blue-500 hover:to-cyan-600 hover:-translate-y-1 hover:scale-105 border border-indigo-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        ghost: "rounded-2xl text-slate-700 bg-transparent hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-200 hover:text-slate-900 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 border border-transparent hover:border-slate-300/50 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-slate-50/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        link: "text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 px-2 py-1 transition-all duration-300",
        premium: "rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 via-fuchsia-600 to-rose-600 text-white shadow-2xl shadow-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/60 hover:from-violet-500 hover:via-purple-500 hover:via-fuchsia-500 hover:to-rose-500 hover:-translate-y-1 hover:scale-105 border border-violet-400/30 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 animate-gradient-x bg-[length:200%_200%]",
        glass: "rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 text-slate-800 shadow-2xl shadow-white/10 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        success: "rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-400 hover:via-teal-500 hover:to-green-600 hover:-translate-y-1 hover:scale-105 border border-emerald-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        warning: "rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-600 text-white shadow-2xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:from-amber-400 hover:via-orange-500 hover:to-yellow-500 hover:-translate-y-1 hover:scale-105 border border-amber-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        info: "rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-600 to-blue-700 text-white shadow-2xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/50 hover:from-sky-400 hover:via-cyan-500 hover:to-blue-600 hover:-translate-y-1 hover:scale-105 border border-sky-400/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        modern: "rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white shadow-2xl shadow-slate-900/40 hover:shadow-2xl hover:shadow-slate-900/60 hover:from-slate-800 hover:to-slate-700 hover:-translate-y-1 hover:scale-105 border border-slate-700/50 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        neon: "rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white shadow-2xl shadow-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/50 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 hover:-translate-y-1 hover:scale-105 border border-cyan-300/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 animate-pulse-glow",
        elegant: "rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 text-white shadow-2xl shadow-neutral-800/40 hover:shadow-2xl hover:shadow-neutral-800/60 hover:from-neutral-700 hover:to-neutral-800 hover:-translate-y-1 hover:scale-105 border border-neutral-600/30 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      },
      size: {
        default: "h-12 px-8 py-3 text-sm",
        sm: "h-9 px-5 py-2 text-xs rounded-xl",
        lg: "h-16 px-10 py-4 text-base rounded-3xl",
        xl: "h-20 px-12 py-6 text-lg rounded-3xl",
        icon: "h-12 w-12 rounded-2xl",
        "icon-sm": "h-9 w-9 rounded-xl",
        "icon-lg": "h-16 w-16 rounded-3xl",
        "icon-xl": "h-20 w-20 rounded-3xl",
        pill: "h-12 px-8 py-3 rounded-full",
        "pill-sm": "h-9 px-5 py-2 text-xs rounded-full",
        "pill-lg": "h-16 px-10 py-4 text-base rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 
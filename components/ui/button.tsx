import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * shadcn Button, restyled onto the editorial design tokens (paper/ink/
 * terracotta from app/globals.css @theme) — NOT shadcn's default
 * background/primary palette. There is one color source of truth.
 *
 * Tailwind v4 derives `bg-ink`, `text-paper`, `border-rule`, etc. from the
 * `--color-*` tokens, so light/dark follow `[data-theme]` automatically.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink-muted",
        accent: "bg-terracotta text-paper hover:opacity-90",
        outline:
          "border border-rule-strong bg-transparent text-ink hover:bg-paper-sunken",
        ghost: "bg-transparent text-ink hover:bg-paper-sunken",
        link: "text-terracotta-ink underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };

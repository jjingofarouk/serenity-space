// components/ui/button.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './button.module.css';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(styles.button, className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
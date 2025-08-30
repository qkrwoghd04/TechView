import Link from 'next/link';
import styles from './Button.module.css';

type HeroButtonProps = {
  href: string;
  icon?: React.ReactNode;
  label: string;
};

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function HeroButton({ href, icon, label, ...props }: HeroButtonProps) {
  return (
    <Link href={href} className={styles.button} {...props}>
      {icon}
      {label}
    </Link>
  );
}

export default function Button({
  onClick,
  disabled = false,
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const buttonClass = [
    styles.actionButton,
    styles[variant],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClass} {...props}>
      {children}
      {icon}
    </button>
  );
}

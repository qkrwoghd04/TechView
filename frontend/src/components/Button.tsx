'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${loading ? styles.loading : ''}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} />
          로딩 중...
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
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

'use client';

import { useState, type ReactNode } from 'react';
import styles from './SectionBlock.module.css';
import { FiChevronDown } from 'react-icons/fi';

type SectionBlockProps = {
  title: string;
  icon: ReactNode;
  variant: 'user' | 'comment' | 'model';
  isCollapsible?: boolean;
  children: ReactNode;
};

export function SectionBlock({
  title,
  icon,
  variant,
  isCollapsible = false,
  children,
}: SectionBlockProps) {
  const [isOpen, setIsOpen] = useState(!isCollapsible);

  const variantClass = styles[variant] || '';

  return (
    <div className={`${styles.block} ${variantClass}`}>
      <div
        className={styles.header}
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
        style={{ cursor: isCollapsible ? 'pointer' : 'default' }}
      >
        <div className={styles.title}>
          <span className={styles.icon}>{icon}</span>
          {title}
        </div>
        {isCollapsible && (
          <FiChevronDown
            className={styles.chevron}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
}

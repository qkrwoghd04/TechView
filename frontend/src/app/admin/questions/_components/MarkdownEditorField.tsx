'use client';

import dynamic from 'next/dynamic';
import { useId } from 'react';
import styles from './MarkdownEditorField.module.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (e: { name: string; value: string }) => void;
  required?: boolean;
  helpText?: string;
  height?: number;
};

export default function MarkdownEditorField({
  name,
  label,
  value,
  onChange,
  required,
  helpText,
  height = 300,
}: Props) {
  const id = useId();

  return (
    <div className={styles.container} data-color-mode="light">
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.editor}>
        <MDEditor
          id={id}
          value={value}
          height={height}
          onChange={(val) => onChange({ name, value: val ?? '' })}
        />
      </div>

      {helpText && <p className={styles.help}>{helpText}</p>}
    </div>
  );
}

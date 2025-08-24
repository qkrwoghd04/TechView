import { ReactNode } from 'react';
import styles from './FormField.module.css';

type BaseProps = {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  name: string;
};

type InputProps = BaseProps & {
  type: 'input';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

type TextareaProps = BaseProps & {
  type: 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
};

type SelectProps = BaseProps & {
  type: 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
};

type Props = InputProps | TextareaProps | SelectProps;

export default function FormField({ label, required, helpText, error, ...props }: Props) {
  const hasError = !!error;
  const fieldClassName = `${styles[props.type]} ${hasError ? styles.error : ''}`;

  return (
    <div className={styles.fieldGroup}>
      <label className={`${styles.label} ${required ? styles.required : ''}`}>{label}</label>

      {props.type === 'input' && (
        <input
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={fieldClassName}
        />
      )}

      {props.type === 'textarea' && (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          rows={props.rows}
          style={props.style}
          className={fieldClassName}
        />
      )}

      {props.type === 'select' && (
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={fieldClassName}
        >
          {props.children}
        </select>
      )}

      {error && <div className={styles.errorText}>{error}</div>}
      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}

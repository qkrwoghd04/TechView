'use client';

import { useState } from 'react';
import styles from './SearchBar.module.css';

type Props = {
  onSearch: (q: string) => void;
  onCategoryChange: (c: string) => void;
};

export default function SearchBar({ onSearch, onCategoryChange }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearchClick = () => {
    onSearch(search);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어 입력"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            검색
          </button>
        </div>

        <select value={category} onChange={handleCategoryChange} className={styles.categorySelect}>
          <option value="">전체 카테고리</option>
          <option value="FRONTEND">FRONTEND</option>
          <option value="BACKEND">BACKEND</option>
        </select>
      </form>
    </div>
  );
}

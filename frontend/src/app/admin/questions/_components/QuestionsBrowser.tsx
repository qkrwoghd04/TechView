'use client';

import { useEffect, useState } from 'react';
import { getQuestions } from '@/lib/api/questions';
import QuestionList from './QuestionList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

export default function QuestionsBrowser() {
  const [questions, setQuestions] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const res = await getQuestions(page, 10, q, category);
    setQuestions(res.data);
    setTotal(res.total);
  };

  useEffect(() => {
    fetchData();
  }, [q, category, page]);

  return (
    <>
      <SearchBar onSearch={setQ} onCategoryChange={setCategory} />
      <QuestionList questions={questions} />
      <Pagination total={total} page={page} limit={10} onPageChange={setPage} />
    </>
  );
}

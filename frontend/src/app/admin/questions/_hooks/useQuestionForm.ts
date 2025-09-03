'use client';

import { useState, useEffect } from 'react';
import type { UpdateQuestionDto, CreateQuestionDto } from '@/types/questions';
import { Category } from '@/types/questions';

type EditOptions = {
  id: string;
  fetcher: (id: string) => Promise<UpdateQuestionDto>;
  submitter: (id: string, form: UpdateQuestionDto) => Promise<any>;
  onSuccess?: (id: string) => void;
};

type NewOptions = {
  submitter: (form: CreateQuestionDto) => Promise<any>;
  onSuccess?: () => void;
};

type Options = EditOptions | NewOptions;

export function useQuestionForm(options: Options) {
  const [form, setForm] = useState<CreateQuestionDto>({
    category: Category.FRONTEND,
    question: '',
    answer: '',
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState('fetcher' in options);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [tagsInput, setTagsInput] = useState('');

  // ✅ edit 모드일 때 초기 데이터 불러오기
  useEffect(() => {
    if ('id' in options && 'fetcher' in options) {
      (async () => {
        try {
          const data = await options.fetcher(options.id);
          setForm({
            category: data.category ?? Category.FRONTEND,
            question: data.question ?? '',
            answer: data.answer ?? '',
            tags: data.tags ?? [],
          });
          setTagsInput(data.tags?.join(', ') ?? '');
        } catch {
          setMessage('데이터를 불러오지 못했습니다.');
          setMessageType('error');
        } finally {
          setInitLoading(false);
        }
      })();
    }
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { name: string; value: string },
  ) => {
    if ('target' in e) {
      const { name, value } = e.target;

      if (name === 'tags') {
        setTagsInput(value);
        setForm({
          ...form,
          tags: value
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        });
      } else {
        setForm({ ...form, [name]: value });
      }
    } else {
      const { name, value } = e;
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if ('id' in options) {
        // edit 모드
        await options.submitter(options.id, form);
        options.onSuccess?.(options.id);
      } else {
        // new 모드
        await options.submitter(form);
        options.onSuccess?.();
      }
      setMessage('성공적으로 처리되었습니다!');
      setMessageType('success');
    } catch {
      setMessage('처리 중 오류가 발생했습니다.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    tagsInput,
    loading,
    initLoading,
    message,
    messageType,
    handleChange,
    handleSubmit,
  };
}

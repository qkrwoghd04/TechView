'use client';

import { useRouter, useParams } from 'next/navigation';
import { getQuestionById, updateQuestion } from '@/lib/api/questions';
import FormContainer from '../../_components/FormContainer';
import FormField from '../../_components/FormField';
import FormMessage from '../../_components/FormMessage';
import FormButtons from '../../_components/FormButtons';
import { useQuestionForm } from '../../_hooks/useQuestionForm';
import MarkdownEditorField from '../../_components/MarkdownEditorField';

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    form,
    loading,
    initLoading,
    message,
    messageType,
    handleChange,
    handleSubmit,
    tagsInput,
  } = useQuestionForm({
    id,
    fetcher: getQuestionById,
    submitter: updateQuestion,
    onSuccess: (id) => setTimeout(() => router.push(`/admin/questions/${id}`), 1000),
  });

  return (
    <FormContainer
      title="질문 수정"
      subtitle="질문과 답안을 수정하세요"
      loading={initLoading}
      loadingText="데이터를 불러오는 중..."
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <FormField
          type="select"
          name="category"
          label="카테고리"
          required
          value={form.category || ''}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="FRONTEND">FRONTEND</option>
          <option value="BACKEND">BACKEND</option>
        </FormField>

        <FormField
          type="textarea"
          name="question"
          label="질문"
          required
          value={form.question || ''}
          onChange={handleChange}
        />

        {/* <FormField
          type="textarea"
          name="answer"
          label="모범 답안"
          required
          value={form.answer || ''}
          onChange={handleChange}
        /> */}
        <MarkdownEditorField
          name="answer"
          label="모범 답안"
          required
          value={form.answer || ''}
          onChange={handleChange}
          helpText="Markdown 형식으로 모범 답안을 입력하세요"
        />

        <FormField
          type="input"
          name="tags"
          label="태그"
          value={tagsInput}
          onChange={handleChange}
        />

        <FormButtons
          submitText="수정 완료"
          submitLoadingText="수정 중..."
          cancelHref={`/admin/questions/${id}`}
          loading={loading}
          variant="success"
        />
      </form>

      {message && <FormMessage type={messageType} message={message} />}
    </FormContainer>
  );
}

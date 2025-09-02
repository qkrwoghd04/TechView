'use client';

import { useRouter } from 'next/navigation';
import { createQuestion } from '@/lib/api/questions';
import type { CreateQuestionDto, UpdateQuestionDto } from '@/types/questions';
import FormContainer from '../_components/FormContainer';
import FormField from '../_components/FormField';
import FormMessage from '../_components/FormMessage';
import FormButtons from '../_components/FormButtons';
import { useQuestionForm } from '../_hooks/useQuestionForm';
import MarkdownEditorField from '../_components/MarkdownEditorField';

export default function NewQuestionPage() {
  const router = useRouter();

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
    submitter: async (form: CreateQuestionDto) => {
      const res = await createQuestion(form);
      router.push(`/admin/questions/${res.id}`);
    },
  });

  return (
    <FormContainer
      title="새 질문 등록"
      subtitle="새로운 면접 질문과 답안을 등록하세요"
      loading={initLoading}
      loadingText="폼을 준비 중..."
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
          helpText="질문이 속하는 기술 분야를 선택하세요"
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
          placeholder="면접 질문을 입력하세요"
          helpText="명확하고 구체적인 질문을 작성하세요"
        />

        {/* <FormField
          type="textarea"
          name="answer"
          label="모범 답안"
          required
          value={form.answer || ''}
          onChange={handleChange}
          placeholder="상세한 모범 답안을 입력하세요"
          helpText="포괄적이고 정확한 답안을 제공하세요"
          style={{ minHeight: '150px' }}
        /> */}

        <MarkdownEditorField
          name="answer"
          label="모범 답안"
          required
          value={form.answer}
          onChange={handleChange}
          helpText="Markdown 형식으로 모범 답안을 입력하세요"
        />

        <FormField
          type="input"
          name="tags"
          label="태그"
          value={tagsInput}
          onChange={handleChange}
          placeholder="예: react, typescript, hooks"
          helpText="관련 기술이나 키워드를 쉼표로 구분하여 입력하세요"
        />

        <FormButtons
          submitText="등록 완료"
          submitLoadingText="등록 중..."
          cancelHref="/admin/questions"
          loading={loading}
          variant="primary"
        />
      </form>

      {message && <FormMessage type={messageType} message={message} />}
    </FormContainer>
  );
}

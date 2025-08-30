import InterviewClient from './_components/InterviewClient';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <InterviewClient category={category} />;
}

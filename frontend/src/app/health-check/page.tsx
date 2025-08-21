export default async function Page() {
  const data = await fetch('https://api.jaehong.link/api/health-check');
  const result = await data.json();
  return (
    <div>
      <h1>Health Check</h1>
      <p>{result.message}</p>
    </div>
  );
}

import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
    <div className={"max-w-screen-lg m-auto"}>
      <div className={"mb-9"}>
        <h1 className={"text-3xl font-bold"}>Submission Point 2 - Page Viewer</h1>
        <h2>Slate.js in Next.js. Tailwind practice also included</h2>
        <Link className={"text-red-600 font-bold"} href="/">Switch to Text Editor</Link>
      </div>
      <div className="flex flex-col gap-6">

      </div>

    </div>
    </>
  );
}

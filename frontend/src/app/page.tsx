import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Content Template Generator</h1>
      <Link href="/create">Create Content</Link>
    </div>
  );
}
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to the Next.js App</h1>
      <Link href="/users">
        <p>View User Points</p>
      </Link>
    </div>
  );
}

export default Home;

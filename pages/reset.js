import Head from 'next/head';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function reset({ query }) {
  if (!query?.token) {
    return (
      <div>
        <Head>
          <title>Game Exchange - Password Reset</title>
        </Head>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Game Exchange - Password Reset</title>
      </Head>
      <Reset token={query.token} />
    </div>
  );
}

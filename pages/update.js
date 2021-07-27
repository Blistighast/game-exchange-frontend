import Head from 'next/head';
import UpdateProduct from '../components/UpdateProduct';

export default function update({ query }) {
  return (
    <div>
      <Head>
        <title>Game Exchange - Edit</title>
      </Head>
      <UpdateProduct id={query.id} />
    </div>
  );
}

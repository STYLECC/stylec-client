import { dehydrate, QueryClient, useQuery } from 'react-query';
import aartServices from '@/services/utils/service';
import React from 'react';
import Header from '@/components/Header';

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const getBlogs = async () => {
  return await aartServices.api.test.blogs();
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', getBlogs);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Posts() {
  const { data } = useQuery('posts', getBlogs);
  return (
    <div>
      <Header />
      <h1>POST 페이지</h1>
      <ul>
        {data?.data.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

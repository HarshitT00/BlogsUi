import { useParams } from 'react-router-dom';
import { BaseLayout } from '../../template/BaseLayout';
import { ReadBlogBody } from './ReadBlogBody';
import { useGetBlogQuery } from '../../query/BlogsQuery';

export const ReadBlog = () => {
  const { blogId } = useParams();
  const { data, isLoading, isError } = useGetBlogQuery(Number(blogId));
  return (
    <BaseLayout
      body={
        <ReadBlogBody blog={data} isError={isError} isLoading={isLoading} />
      }
    />
  );
};

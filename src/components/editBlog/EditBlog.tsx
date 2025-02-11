import { useNavigate, useParams } from 'react-router-dom';
import { BaseLayout } from '../../template/BaseLayout';
import { EditBlogBody } from './EditBlogBody';
import { useGetBlogQuery, useUpdateBlogMutation } from '../../query/BlogsQuery';
import { BlogFormData } from '../../api/BlogsApiModels';
import { Box, CircularProgress } from '@mui/material';

export const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBlogQuery(Number(blogId));
  const { mutate, isPending } = useUpdateBlogMutation(localStorage.getItem('userName'));

  const handleSubmit = async (formData: BlogFormData) => {
    mutate(
      { blogId: Number(blogId), req: formData },
      {
        onSuccess: () => {
          navigate('/my-blogs');
        },
      }
    );
  };

  return (
    <BaseLayout
      body={
        isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <EditBlogBody isEdit={true} data={data} onSubmit={handleSubmit} isPending={isPending} />
        )
      }
    />
  );
};

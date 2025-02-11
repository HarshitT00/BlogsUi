import { useNavigate } from 'react-router-dom';
import { BaseLayout } from '../../template/BaseLayout';
import { EditBlogBody } from './EditBlogBody';
import { useAddBlogMutation } from '../../query/BlogsQuery';
import { BlogFormData } from '../../api/BlogsApiModels';

export const AddBlog = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddBlogMutation(
    localStorage.getItem('userName')
  );

  const handleSubmit = async (formData: BlogFormData) => {
    mutate(
      { req: formData },
      {
        onSuccess: () => {
          navigate('/my-blogs');
        },
      }
    );
  };

  return (
    <BaseLayout
      body={<EditBlogBody onSubmit={handleSubmit} isPending={isPending} />}
    />
  );
};

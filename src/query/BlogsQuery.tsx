import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addBlog,
  deleteBlog,
  fetchBlogs,
  fetchMyBlogs,
  getBlog,
  updateBlog,
} from '../api/BlogsApi';
import { BlogFormData, BlogRequest } from '../api/BlogsApiModels';

export const useBlogsInfiniteQuery = (req: BlogRequest) => {
  return useInfiniteQuery({
    queryKey: ['blogs', { ...req }],
    queryFn: ({ pageParam }) => fetchBlogs({ ...req, pageNumber: pageParam }),
    staleTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => (lastPage.hasMoreItems ? lastPage.pageNumber + 1 : undefined),
    initialPageParam: 0,
  });
};

export const useMyBlogsInfiniteQuery = (userName: string | null, req: BlogRequest) => {
  return useInfiniteQuery({
    queryKey: ['blogs', userName, { ...req }],
    queryFn: ({ pageParam }) => fetchMyBlogs(userName, { ...req, pageNumber: pageParam }),
    staleTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => (lastPage.hasMoreItems ? lastPage.pageNumber + 1 : undefined),
    initialPageParam: 0,
    enabled: !!userName,
  });
};

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId: number) => deleteBlog(blogId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useGetBlogQuery = (blogId: number) => {
  return useQuery({
    queryKey: ['blogs', blogId],
    queryFn: ({ pageParam }) => getBlog(blogId),
    staleTime: 30 * 60 * 1000,
  });
};

export const useUpdateBlogMutation = (userName: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, req }: { blogId: number; req: BlogFormData }) => {
      if (!userName) throw new Error('User name is required');

      return updateBlog(blogId, userName, req);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useAddBlogMutation = (userName: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ req }: { req: BlogFormData }) => {
      if (!userName) throw new Error('User name is required');

      return addBlog(userName, req);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

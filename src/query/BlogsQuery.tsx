import { useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { deleteBlog, fetchBlogs, fetchMyBlogs, getBlog } from '../api/BlogsApi';
import { BlogRequest } from '../api/BlogsApiModels';

export const useBlogsInfiniteQuery = (req : BlogRequest) => {
    return useInfiniteQuery({
        queryKey: ['blogs', {...req}],
        queryFn: ({ pageParam }) => fetchBlogs({ ...req, pageNumber: pageParam }),
        staleTime: 30 * 60 * 1000,
        getNextPageParam: (lastPage) => lastPage.hasMoreItems ? lastPage.pageNumber + 1 : undefined,
        initialPageParam: 0,
    });
};

export const useMyBlogsInfiniteQuery = (userName: string | null, req : BlogRequest) => {
    return useInfiniteQuery({
        queryKey: ['blogs', userName, {...req}],
        queryFn: ({ pageParam }) => fetchMyBlogs(userName, { ...req, pageNumber: pageParam }),
        staleTime: 30 * 60 * 1000,
        getNextPageParam: (lastPage) => lastPage.hasMoreItems ? lastPage.pageNumber + 1 : undefined,
        initialPageParam: 0,
        enabled: !!userName
    });
};

export const useDeleteBlogMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (blogId : number) => deleteBlog(blogId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        }
    });
}

export const useGetBlogQuery = (blogId : number) => {
    return useQuery({
        queryKey: ['blogs', blogId],
        queryFn: ({ pageParam }) => getBlog(blogId),
        staleTime: 30 * 60 * 1000,
    });
};
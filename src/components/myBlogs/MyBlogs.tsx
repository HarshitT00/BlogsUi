import { BaseLayout } from '../../template/BaseLayout';
import { HomeHeader } from '../home/HomeHeader';
import { useDeleteBlogMutation, useMyBlogsInfiniteQuery } from '../../query/BlogsQuery';
import { SortBy, SortOrder } from '../../api/BlogsApiModels';
import { useState } from 'react';
import { MyBlogsBody } from './MyBlogsBody';

export const MyBlogs = () => {
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
    const { data: allBlogsData, isLoading, fetchNextPage, isError, hasNextPage } = useMyBlogsInfiniteQuery(
        'testuser',{ pageSize: 3, sortDirection: sortOrder, sortBy: SortBy.CREATED_AT }
    );
    const { mutate } = useDeleteBlogMutation();
    return (
        <BaseLayout 
        header={<HomeHeader setSortOrder={setSortOrder} sortOrder={sortOrder}/>} 
        body={<MyBlogsBody blogsResponse={allBlogsData} isLoading={isLoading} isError={isError} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} deleteBlog={mutate}/>}
        />
    );
}
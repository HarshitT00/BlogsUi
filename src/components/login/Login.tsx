import { useLoginMutationQuery } from '../../query/AuthQuery';
import { BaseLayout } from '../../template/BaseLayout';
import { LoginBody } from './LoginBody';

export const Login = () => {
    const { mutate, isPending, isError, error } = useLoginMutationQuery();
    return (
        <BaseLayout 
        body={<LoginBody handleLogin={mutate} isLoading={isPending} isError={isError} errorMessage={error?.message}/>}
        />
    );
}
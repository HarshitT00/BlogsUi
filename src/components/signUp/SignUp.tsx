import { useSignUpMutationQuery } from '../../query/AuthQuery';
import { BaseLayout } from '../../template/BaseLayout';
import { SignUpBody } from './SignUpBody';

export const SignUp = () => {
    const { mutate, isPending, isError, error } = useSignUpMutationQuery();
    return (
        <BaseLayout 
        body={<SignUpBody handleSignUp={mutate} isLoading={isPending} isError={isError} errorMessage={error?.message}/>}
        />
    );
}
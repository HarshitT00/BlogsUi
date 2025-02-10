import { useMutation } from "@tanstack/react-query";
import { loginUser, signUpUser } from "../api/AuthApi";
import { LoginRequest, SignUpRequest } from "../api/AuthApiModels";


export const useLoginMutationQuery = () => {
    
    return useMutation({
        mutationFn: (req : LoginRequest) => loginUser(req),
        onSuccess: (data, req) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', req.userName);
        }
    });
}

export const useSignUpMutationQuery = () => {
    
    return useMutation({
        mutationFn: (req : SignUpRequest) => signUpUser(req),
    });
}
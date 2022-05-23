import React, { useEffect } from 'react';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../fireabse.init';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [signInWithgithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (githubError) {
            toast.error(githubError.code)
        }
    }, [githubError])

    useEffect(() => {
        if (facebookError) {
            toast.error(facebookError.code)
        }
    }, [facebookError])
    useEffect(() => {
        if (googleError) {
            toast.error(googleError.code)
        }
    }, [googleError])

    const from = location.state?.from?.pathname || "/home";
    const path = location.pathname;
    const pathValidation = path === '/login';

    useEffect(() => {
        if (googleUser || facebookUser || githubUser) {
            const googleEmail = googleUser?.user?.email;
            const facebookEmail = facebookUser?.user?.email;
            const githubEmail = githubUser?.user?.email;
            navigate(from, { replace: true });
        }
    }, [googleUser, facebookUser, githubUser, navigate, from])

    if (googleLoading || facebookLoading || githubLoading) {
        return <p>Loading</p>
    }
    return (
        <div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>


                <button onClick={() => signInWithGoogle()} className="mt-3 btn bg-red-700 text-white">Google {pathValidation?'Login':'Signup'}</button>
                <button onClick={() => signInWithgithub()} className="mt-3 btn bg-green-800 text-white">Github {pathValidation?'Login':'Signup'}</button>
                <button onClick={() => signInWithFacebook()} className="mt-3 btn bg-blue-800 text-white">Facebook {pathValidation?'Login':'Signup'}</button>
            </div>

        </div>
    );
};

export default SocialLogin;
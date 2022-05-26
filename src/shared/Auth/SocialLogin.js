import React, { useEffect } from 'react';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../fireabse.init';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useJWT from '../../hooks/useJWT';
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

    const accessToken = useJWT()
    useEffect(() => {
        if (googleUser || facebookUser || githubUser) {
            const googleEmail = googleUser?.user?.email;
            const facebookEmail = facebookUser?.user?.email;
            const githubEmail = githubUser?.user?.email;
            accessToken(googleEmail || facebookEmail || githubEmail)



            if (googleUser || facebookUser || githubUser) {
                const { email, displayName, photoURL } = googleUser?.user || facebookUser?.user || githubUser?.user;
                const data = {
                    name: displayName, email: email, phone: '', education: '', address: '', github: '', role: 'customer', photo: photoURL

                }
                fetch('https://exo-parts.herokuapp.com/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {

                    })
            }

            navigate(from, { replace: true })

        }
    }, [googleUser, facebookUser, githubUser, navigate, from, accessToken])

    if (googleLoading || facebookLoading || githubLoading) {
        return <p>Loading</p>
    }
    return (
        <div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>

                <button onClick={() => signInWithGoogle()} className="mt-3 btn bg-red-700 text-white"><FontAwesomeIcon icon={faGoogle} /> <span className='ml-3'>Google {pathValidation ? 'Login' : 'Signup'}</span></button>
                <button onClick={() => signInWithgithub()} className="mt-3 btn bg-green-800 text-white"><FontAwesomeIcon icon={faGithub} /> <span className='ml-3'>Github {pathValidation ? 'Login' : 'Signup'}</span></button>
                <button onClick={() => signInWithFacebook()} className="mt-3 btn bg-blue-800 text-white"><FontAwesomeIcon icon={faFacebook} /> <span className='ml-3'>Facebook {pathValidation ? 'Login' : 'Signup'}</span></button>
            </div>

        </div>
    );
};

export default SocialLogin;
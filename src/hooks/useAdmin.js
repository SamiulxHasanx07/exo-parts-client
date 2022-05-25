import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../fireabse.init";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(true);
    const [adminLoading, setAdminLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'appliation/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`

                }
            })
                .then(res => {
                    console.log(res);
                    
                    if(res.status===401 ||res.status===403 ){
                        signOut(auth)
                        navigate('/login')
                    }
                    return res.json()
                })
                .then(data => {
                    setAdmin(data.role)
                    setAdminLoading(false)
                })
        }
    }, [user, adminLoading, navigate])

    return [admin]
}

export default useAdmin;
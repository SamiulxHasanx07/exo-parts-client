import { useEffect, useState } from "react";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(true);
    const [adminLoading, setAdminLoading] = useState(false)
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
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.role)
                    setAdminLoading(false)
                })
        }
    }, [user, adminLoading])

    return [admin]
}

export default useAdmin;
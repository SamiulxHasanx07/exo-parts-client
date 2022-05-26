const useJWT = () => {
    const accessToken = (email) => {
        fetch('https://exo-parts.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
            })
    }
    return accessToken;
};

export default useJWT;
import { useEffect, useState } from 'react';


const withSites = (Component: React.FC) => {

    const [sites, setSites] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSites = async () => {
        let res;
        setLoading(true)
        if (loading) {
            return;
        }
        try {
            res = await fetch('https://6389df1b4eccb986e89cf319.mockapi.io/external-verification/websites');
            if (res?.status === 200) {
                const resJson = await res?.json();
                setSites(resJson);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw new Error(e);
        }
    }

    useEffect(() => {
        getSites();
    }, [])

    return <Component sites={sites} loading={loading} />
}

export default withSites;

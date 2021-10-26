import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/changelog').then(() => {});
	}, []);

	return <div />;
}

export default Home;

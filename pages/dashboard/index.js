import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Main from '../../components/admin/Main';
import SignIn from '../../components/common/Auth';

const Admin = () => {
	const [session, setSession] = useState(null);
	const [changelogs, setChangelogs] = useState([]);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		async function fetchChangelogs() {
			const user = supabase.auth.user();

			if (user) {
				// Fetch changelogs where user is the author
				const { data, error } = await supabase
					.from('changelogs')
					.select()
					.match({ author: user.id })
					.order('updated_at', { ascending: false });

				if (data && data.length > 0) {
					setChangelogs(data);
				} else {
					console.log(error);
				}

				// Fetch user's profile
				const { data: profile, error: profileError } = await supabase
					.from('profiles')
					.select()
					.match({ id: user?.id })
					.single();

				if (profile) {
					setProfile(profile);
				} else {
					console.log(profileError);
				}
			}
		}

		fetchChangelogs().then(() => {});
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	return session ? (
		<Main changelogs={changelogs} profile={profile} />
	) : (
		<SignIn />
	);
};

export default Admin;

import { useEffect, useState } from 'react';
import {
	chakra,
	Button,
	FormControl,
	FormLabel,
	Input,
	Skeleton,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import SettingsLayout from '../../components/layouts/Settings';
import { supabase } from '../../lib/supabaseClient';

function PublicPage() {
	const [user, setUser] = useState(null);
	const [profileSaving, setProfileSaving] = useState(false);
	const toast = useToast();

	useEffect(() => {
		async function fetchUserProfile(id) {
			const { data, error } = await supabase
				.from('profiles')
				.select()
				.match({ id })
				.single();

			if (data) {
				setUser(data);
			} else {
				console.log(error);
			}
		}

		const user = supabase.auth.user();
		fetchUserProfile(user?.id).then(() => {});
	}, []);

	async function updateProfile(update) {
		const { data, error } = await supabase
			.from('profiles')
			.update(update)
			.match({ id: user.id });

		if (data) {
			toast({
				title: 'Saved!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		} else {
			// throw error
			console.log(error);
		}
	}

	return (
		<SettingsLayout>
			<chakra.h2 fontSize='2xl' mb={8}>
				Public Changelog Page Settings
			</chakra.h2>
			<Skeleton w='full' isLoaded={user}>
				<Formik
					initialValues={{
						subdomain: user?.subdomain ?? '',
					}}
					onSubmit={async (values) => {
						setProfileSaving(true);
						await updateProfile(values);
						setProfileSaving(false);
					}}
				>
					{(formik) => (
						<chakra.form w='full' onSubmit={formik.handleSubmit}>
							<FormControl mb={8}>
								<FormLabel>Subdomain</FormLabel>
								<Input
									onChange={(e) => {
										console.log(e.target.value);
										formik.handleChange(e);
									}}
									name='subdomain'
									type='text'
									value={formik.values.subdomain}
									w='full'
									h={12}
								/>
							</FormControl>
							<FormControl>
								<Button
									colorScheme='brand'
									size='lg'
									type='submit'
								>
									{profileSaving ? 'Saving...' : 'Save'}
								</Button>
							</FormControl>
						</chakra.form>
					)}
				</Formik>
			</Skeleton>
		</SettingsLayout>
	);
}

export default PublicPage;

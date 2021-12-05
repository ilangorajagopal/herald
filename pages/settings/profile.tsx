import { useEffect, useRef, useState } from 'react';
import {
	chakra,
	Avatar,
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Skeleton,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { supabase } from '../../lib/supabaseClient';
import { fetchUserProfile } from '../../lib/utils';
import SettingsLayout from '../../components/layouts/Settings';

function Profile() {
	const [user, setUser] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [avatarUploading, setAvatarUploading] = useState(false);
	const [profileSaving, setProfileSaving] = useState(false);
	const avatarUploadInputRef = useRef(null);
	const toast = useToast();

	useEffect(() => {
		const user = supabase.auth.user();
		fetchUserProfile(user?.id)
			.then((res) => {
				setUser(res?.data);
				setAvatarUrl(res?.data?.avatar_url);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function toggleAvatarUpload() {
		avatarUploadInputRef?.current?.click();
	}

	async function uploadAvatar(event) {
		try {
			setAvatarUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				new Error('You must select an image to upload.');
			}

			const file = event.target.files[0];
			const filePath = `public/${user.id}/avatar/${file.name}`;

			let { error } = await supabase.storage
				.from('assets')
				.upload(filePath, file);

			if (error) {
				throw error;
			}

			const { publicURL } = supabase.storage
				.from('assets')
				.getPublicUrl(filePath);

			setAvatarUrl(publicURL);
			await updateProfile({ avatar_url: publicURL });
		} catch (error) {
			alert(error.message);
		} finally {
			setAvatarUploading(false);
		}
	}

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
				Profile Settings
			</chakra.h2>
			<Skeleton w='full' isLoaded={user}>
				<Formik
					initialValues={{
						name: user?.name || '',
						email: user?.email || '',
					}}
					onSubmit={async (values) => {
						setProfileSaving(true);
						await updateProfile(values);
						setProfileSaving(false);
					}}
				>
					{(formik) => (
						<chakra.form onSubmit={formik.handleSubmit}>
							<FormControl mb={8}>
								<FormLabel>Avatar</FormLabel>
								<Box
									d='flex'
									flexDirection='column'
									alignItems='center'
									justifyContent='center'
									w='200px'
									h='200px'
									border={1}
									borderStyle='solid'
									borderColor='gray.300'
									borderRadius='lg'
								>
									{avatarUrl ? (
										<Image
											borderRadius='full'
											boxSize='96px'
											src={avatarUrl}
											alt={user?.name}
										/>
									) : (
										<Avatar size='xl' />
									)}
									<Button
										size='sm'
										onClick={toggleAvatarUpload}
										mt={4}
										colorScheme='brand'
										className='upload'
										overflow='hidden'
									>
										{avatarUploading
											? 'Uploading...'
											: 'Upload'}
									</Button>
									<Input
										onChange={uploadAvatar}
										ref={avatarUploadInputRef}
										type='file'
										hidden={true}
									/>
								</Box>
							</FormControl>
							<FormControl mb={8}>
								<FormLabel>Name</FormLabel>
								<Input
									onChange={formik.handleChange}
									name='name'
									type='text'
									w='full'
									h={12}
									value={formik.values.name}
								/>
							</FormControl>
							<FormControl mb={8}>
								<FormLabel>Email address</FormLabel>
								<Input
									onChange={formik.handleChange}
									name='email'
									type='email'
									w='full'
									h={12}
									value={formik.values.email}
								/>
							</FormControl>
							<FormControl mb={8}>
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

export default Profile;

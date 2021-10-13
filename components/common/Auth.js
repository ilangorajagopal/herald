import { useState } from 'react';
import {
	chakra,
	Alert,
	AlertDescription,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { supabase } from '../../lib/supabaseClient';
import AuthLayout from '../layouts/Auth';

const Auth = () => {
	const [alertObject, setAlertObject] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleLogin = async ({ email }) => {
		setLoading(true);
		const { error } = await supabase.auth.signIn(
			{ email },
			{ redirectTo: '/dashboard' }
		);

		if (error) {
			setAlertObject({
				status: 'error',
				message: error?.error_description || error?.message,
			});
		} else {
			setAlertObject({
				status: 'success',
				message: 'Check your email for a login link',
			});
		}
		setLoading(false);
	};

	return (
		<AuthLayout>
			<Stack
				w='full'
				alignItems='center'
				justifyContent='center'
				flex='1'
				spacing={8}
				mx={'auto'}
				py={32}
				px={6}
			>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign In / Sign Up</Heading>
				</Stack>
				<Box
					w='400px'
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					px={6}
					py={8}
				>
					<Formik
						initialValues={{ email: '' }}
						onSubmit={handleLogin}
					>
						{(formik) => (
							<chakra.form
								w='full'
								onSubmit={formik.handleSubmit}
							>
								<FormControl>
									<FormLabel>Email address</FormLabel>
									<Input
										onChange={formik.handleChange}
										h={12}
										type='email'
										value={formik.values.email}
									/>
								</FormControl>
								<Button
									colorScheme='brand'
									w='full'
									h={12}
									mt={4}
									isLoading={loading}
									loadingText='Signing In...'
									type='submit'
								>
									Sign In
								</Button>
								{alertObject ? (
									<Alert
										status={alertObject.status}
										mt={4}
										borderRadius='lg'
									>
										<AlertDescription>
											{alertObject.message}
										</AlertDescription>
									</Alert>
								) : null}
							</chakra.form>
						)}
					</Formik>
				</Box>
			</Stack>
		</AuthLayout>
	);
};

export default Auth;

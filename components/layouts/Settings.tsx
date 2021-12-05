import NextLink from 'next/link';
import { chakra, HStack, List, ListItem } from '@chakra-ui/react';
import { Container, Header } from '../common';

const SettingsLayout = (props) => (
	<Container height='auto' minH='100vh'>
		<Header />
		<HStack
			w='full'
			maxW='container.md'
			h='auto'
			d='flex'
			alignItems='flex-start'
			justifyContent='flex-start'
			py={8}
		>
			<chakra.aside
				w='20%'
				h='auto'
				d='flex'
				flexDirection='column'
				alignItems='flex-start'
				justifyContent='flex-start'
				flex='1 0 auto'
			>
				<List spacing={2}>
					<ListItem px={4} py={2}>
						<NextLink href='/settings/profile'>Profile</NextLink>
					</ListItem>
					<ListItem px={4} py={2}>
						<NextLink href='/settings/account'>Account</NextLink>
					</ListItem>
					<ListItem px={4} py={2}>
						<NextLink href='/settings/public-page'>
							Public Page
						</NextLink>
					</ListItem>
					<ListItem px={4} py={2}>
						<NextLink href='/settings/widget'>Widget</NextLink>
					</ListItem>
					<ListItem px={4} py={2}>
						<NextLink href='/settings/template'>
							Your Template
						</NextLink>
					</ListItem>
				</List>
			</chakra.aside>
			<chakra.main
				w='80%'
				h='auto'
				d='flex'
				flexDirection='column'
				alignItems='flex-start'
				justifyContent='flex-start'
				flex='1 0 auto'
			>
				{props.children}
			</chakra.main>
		</HStack>
	</Container>
);

export default SettingsLayout;

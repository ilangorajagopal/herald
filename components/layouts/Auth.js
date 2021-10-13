import { chakra, useColorModeValue } from '@chakra-ui/react';
import { Container } from '../common';
import React from 'react';
import Image from 'next/image';

const AuthLayout = (props) => (
	<Container height='auto' minH='100vh'>
		<chakra.div
			w='full'
			maxW='container.md'
			h='auto'
			d='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='flex-start'
			flex='1 0 auto'
		>
			{props.children}
		</chakra.div>
		<chakra.footer
			maxW='container.md'
			py={4}
			d='flex'
			alignItems='center'
			justifyContent='center'
			fontSize='xs'
			color={useColorModeValue('gray.600', 'gray.400')}
		>
			Powered by
			<chakra.a
				d='flex'
				alignItems='center'
				ml={1}
				href='https://useherald.com/'
				target='_blank'
				rel='noopener noreferrer'
			>
				<Image
					src='/logo.png'
					width={16}
					height={16}
					alt='Herald Logo'
				/>
			</chakra.a>
		</chakra.footer>
	</Container>
);

export default AuthLayout;

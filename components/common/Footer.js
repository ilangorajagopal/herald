import Image from 'next/image';
import {
	chakra,
	Box,
	Container,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
	const bg = useColorModeValue('white', 'gray.800');

	return (
		<chakra.footer bg={bg} overflowY='hidden' w='full' flexShrink={0}>
			<Box
				borderTopWidth={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW='container.md'
					px={0}
					py={4}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ base: 'center', md: 'space-between' }}
					align={{ base: 'center', md: 'center' }}
				>
					<Box
						w='full'
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
								src='https://useherald.com/_next/image?url=%2Flogo.png&w=48&q=75'
								width={16}
								height={16}
								alt='Herald Logo'
							/>
						</chakra.a>
					</Box>
				</Container>
			</Box>
		</chakra.footer>
	);
};

export default Footer;

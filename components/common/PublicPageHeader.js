import NextLink from 'next/link';
import {
	chakra,
	Flex,
	HStack,
	IconButton,
	Image,
	Link,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaExternalLinkSquareAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/router';

function PublicPageHeader(props) {
	const { profile } = props;
	const { toggleColorMode: toggleMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const { pathname } = useRouter();

	return (
		<chakra.header
			d='flex'
			transition='box-shadow 0.2s'
			w='full'
			h='6rem'
			overflowY='hidden'
			flexDirection='column'
		>
			<chakra.div
				d='flex'
				w='full'
				h='6rem'
				mx='auto'
				maxW='container.md'
			>
				<Flex
					w='full'
					h='full'
					p={0}
					alignItems='center'
					justifyContent='space-between'
				>
					<Flex align='flex-start'>
						<NextLink href='/'>
							<chakra.a
								d='flex'
								alignItems='center'
								justifyContent='center'
								cursor='pointer'
							>
								<Image
									src={profile?.company_logo}
									htmlWidth={40}
									htmlHeight={40}
									alt='Logo'
								/>
								<chakra.span
									fontSize='xl'
									fontWeight='bold'
									color={useColorModeValue(
										'gray.900',
										'white'
									)}
									ml={2}
									d='flex'
									alignItems='center'
									justifyContent='flex-start'
								>
									{profile?.company_name}
								</chakra.span>
							</chakra.a>
						</NextLink>
					</Flex>
					<HStack
						spacing='5'
						justify='flex-end'
						align='center'
						color='gray.400'
					>
						<IconButton
							size='md'
							fontSize='lg'
							aria-label={`Switch to ${text} mode`}
							variant='ghost'
							color='current'
							ml={{ base: '0', md: '3' }}
							onClick={toggleMode}
							icon={<SwitchIcon />}
						/>
						{pathname === '/changelog' ? (
							<NextLink href='/roadmap'>Our Roadmap</NextLink>
						) : (
							<NextLink href='/changelog'>Our Changelog</NextLink>
						)}
						<Link
							d='flex'
							alignItems='center'
							href={profile?.website}
							isExternal
						>
							Home&nbsp;&nbsp;
							<FaExternalLinkSquareAlt />
						</Link>
					</HStack>
				</Flex>
			</chakra.div>
		</chakra.header>
	);
}

export default PublicPageHeader;

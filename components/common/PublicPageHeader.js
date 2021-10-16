import NextLink from 'next/link';
import { chakra, Flex, Image, Link, useColorModeValue } from '@chakra-ui/react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

function PublicPageHeader(props) {
	const { profile } = props;

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
					<Flex justify='flex-end' align='center' color='gray.400'>
						<Link
							d='flex'
							alignItems='center'
							href={profile?.website}
							isExternal
						>
							Home&nbsp;&nbsp;
							<FaExternalLinkSquareAlt />
						</Link>
					</Flex>
				</Flex>
			</chakra.div>
		</chakra.header>
	);
}

export default PublicPageHeader;

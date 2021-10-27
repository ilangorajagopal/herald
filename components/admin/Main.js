import { useState } from 'react';
import NextLink from 'next/link';
import {
	Box,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import capitalize from 'lodash.capitalize';
import DefaultLayout from '../layouts/Default';
import Changelogs from './Changelogs';
import Banners from './Banners';
import Roadmap from './Roadmap';

export default function Main(props) {
	const { banners, changelogs, profile } = props;
	const [activeType, setActiveType] = useState('changelog');

	let componentContent = null;
	if (activeType === 'changelog') {
		componentContent = (
			<>
				<Flex
					alignItems='center'
					justifyContent='start'
					w='full'
					mb={4}
				>
					<NextLink href='/changelog/new'>
						<Button px={8} py={6} colorScheme='brand'>
							Add Update
						</Button>
					</NextLink>
				</Flex>
				<Changelogs changelogs={changelogs} profile={profile} />
			</>
		);
	} else if (activeType === 'banners') {
		componentContent = (
			<>
				<Flex
					alignItems='center'
					justifyContent='start'
					w='full'
					mb={4}
				>
					<NextLink href='/banner/new'>
						<Button px={8} py={6} colorScheme='brand'>
							Add Banner
						</Button>
					</NextLink>
				</Flex>
				<VStack w='full' spacing={8}>
					<Banners banners={banners} profile={profile} />
				</VStack>
			</>
		);
	} else if (activeType === 'waitlist') {
		componentContent = (
			<Box
				w='full'
				h={48}
				d='flex'
				alignItems='center'
				justifyContent='center'
				borderWidth={2}
				borderStyle='solid'
				borderColor={useColorModeValue('gray.400', 'gray.700')}
				borderRadius='lg'
			>
				Coming soon!
			</Box>
		);
	} else if (activeType === 'roadmap') {
		componentContent = (
			<>
				<VStack w='full' spacing={8}>
					<Roadmap profile={profile} />
				</VStack>
			</>
		);
	}

	return (
		<DefaultLayout>
			<VStack py={8} w='full' spacing={8}>
				<Flex
					alignItems='center'
					justifyContent='flex-start'
					w='full'
					my={6}
				>
					<Menu>
						<MenuButton
							as={Button}
							fontSize='4xl'
							px={0}
							rightIcon={<FiChevronDown />}
							variant='ghost'
							w='auto'
							_hover={{ bg: 'none' }}
							_active={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
						>
							{capitalize(activeType)}
						</MenuButton>
						<MenuList mt={2} p={0}>
							<MenuItem
								onClick={() => setActiveType('changelog')}
								p={4}
							>
								Changelog
							</MenuItem>
							<MenuItem
								onClick={() => setActiveType('banners')}
								p={4}
							>
								Banners
							</MenuItem>
							<MenuItem
								onClick={() => setActiveType('waitlist')}
								p={4}
							>
								Waitlist
							</MenuItem>
							<MenuItem
								onClick={() => setActiveType('roadmap')}
								p={4}
							>
								Roadmap
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
				{componentContent}
			</VStack>
		</DefaultLayout>
	);
}

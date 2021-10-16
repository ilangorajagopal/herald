import { useState } from 'react';
import NextLink from 'next/link';
import { Button, Flex, Select, VStack } from '@chakra-ui/react';
import DefaultLayout from '../layouts/Default';
import Changelogs from './Changelogs';
import Banners from './Banners';

export default function Main(props) {
	const { changelogs, profile } = props;
	const [activeType, setActiveType] = useState('changelogs');

	let componentContent = null;
	if (activeType === 'changelogs') {
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
					<NextLink href='/changelog/new'>
						<Button px={8} py={6} colorScheme='brand'>
							Add Banner
						</Button>
					</NextLink>
				</Flex>
				<VStack w='full' spacing={8}>
					<Banners banners={[]} profile={profile} />
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
					<Select
						w='auto'
						fontSize='4xl'
						defaultValue={activeType}
						onChange={(e) => setActiveType(e.target.value)}
						variant='unstyled'
					>
						<option value='changelogs'>Changelog</option>
						<option value='banners'>Banners</option>
						{/*<option value="roadmap">*/}
						{/*	Roadmap*/}
						{/*</option>*/}
					</Select>
				</Flex>
				{componentContent}
			</VStack>
		</DefaultLayout>
	);
}

import Head from 'next/head';
import { chakra, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../lib/supabaseClient';
import TimelineLayout from '../components/layouts/Timeline';
import { format, formatDistance } from 'date-fns';

function Changelog(props) {
	const { changelog } = props;

	return (
		<>
			<Head>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/logo.png'
				/>
			</Head>
			<TimelineLayout>
				<VStack py={16} w='full' spacing={8}>
					<Box w='full' mb={4}>
						<Heading as='h2' mb={4}>
							{changelog.title}
						</Heading>
						<chakra.div
							d='flex'
							alignItems='center'
							justifyContent='start'
							mb={8}
							w='full'
						>
							<Text
								fontSize='md'
								title={format(
									new Date(changelog.updated_at),
									'PPPpp'
								)}
							>
								{formatDistance(
									new Date(changelog.updated_at),
									new Date(),
									{ addSuffix: true }
								)}
							</Text>
						</chakra.div>
						<chakra.div
							className='herald'
							fontSize='lg'
							lineHeight='tall'
							dangerouslySetInnerHTML={{
								__html: changelog.content,
							}}
						/>
					</Box>
				</VStack>
			</TimelineLayout>
		</>
	);
}

export default Changelog;

export async function getServerSideProps(context) {
	const { changelog } = context.params;
	const { data, error } = await supabase
		.from('changelogs')
		.select()
		.match({ id: changelog })
		.order('updated_at', { ascending: false })
		.single();

	if (changelog) {
		return {
			props: {
				changelog: data,
			},
		};
	} else {
		return {
			props: {
				changelog: {},
				error,
			},
		};
	}
}

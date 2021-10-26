import { Fragment } from 'react';
import Head from 'next/head';
import { chakra, Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';
import TimelineLayout from '../../components/layouts/Timeline';
import { format, formatDistance } from 'date-fns';

function ChangelogPage(props) {
	const { changelogs, profile } = props;

	return (
		<>
			<Head>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href={profile?.company_logo}
				/>
			</Head>
			<TimelineLayout profile={profile}>
				<VStack py={16} w='full' spacing={8}>
					{changelogs.map((changelog, index) => {
						return (
							<Fragment key={changelog.id}>
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
								{index < changelogs.length - 1 ? (
									<Divider mb={4} />
								) : null}
							</Fragment>
						);
					})}
				</VStack>
			</TimelineLayout>
		</>
	);
}

export default ChangelogPage;

export async function getServerSideProps() {
	const { data: profile } = await supabase
		.from('profiles')
		.select('company_logo,company_name,website')
		.match({ subdomain: 'herald' })
		.single();

	const { data: changelogs, error } = await supabase
		.from('changelogs')
		.select()
		.match({ author: '71900427-a160-4ed2-b13c-0af51c646878' })
		.order('updated_at', { ascending: false });

	if (changelogs && changelogs.length > 0) {
		return {
			props: {
				changelogs,
				profile,
			},
		};
	} else {
		return {
			props: {
				changelogs: [],
				error,
			},
		};
	}
}

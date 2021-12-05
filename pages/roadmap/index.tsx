import Head from 'next/head';
import { Skeleton, VStack } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';
import TimelineLayout from '../../components/layouts/Timeline';
import PublicFeaturesList from '../../components/admin/PublicFeaturesList';
import { useFeatures } from '../../lib/hooks';

function RoadmapPage(props) {
	const { profile, roadmap } = props;
	const { features, isLoading } = useFeatures(roadmap?.id);

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
					<Skeleton isLoaded={!isLoading}>
						{features && features.length > 0 ? (
							<PublicFeaturesList
								features={features}
								roadmap={roadmap}
							/>
						) : null}
					</Skeleton>
				</VStack>
			</TimelineLayout>
		</>
	);
}

export default RoadmapPage;

export async function getServerSideProps() {
	// TODO: Use subdomain instead of hardcoded value for fetching profile
	const { data: profile } = await supabase
		.from('profiles')
		.select('id,company_logo,company_name,website')
		.match({ subdomain: 'herald' })
		.single();

	const { data: roadmap } = await supabase
		.from('roadmaps')
		.select('id')
		.match({ author: profile?.id })
		.single();

	if (roadmap) {
		return {
			props: {
				profile,
				roadmap,
			},
		};
	} else {
		return {
			props: {
				roadmap: {},
			},
		};
	}
}

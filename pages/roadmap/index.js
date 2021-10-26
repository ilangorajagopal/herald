import Head from 'next/head';
import { VStack } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';
import TimelineLayout from '../../components/layouts/Timeline';
import PublicFeaturesList from '../../components/admin/PublicFeaturesList';

function RoadmapPage(props) {
	const { features, profile } = props;

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
					<PublicFeaturesList features={features} />
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

	const { data: features, error } = await supabase
		.from('features')
		.select()
		.match({ roadmap_id: roadmap?.id })
		.order('upvotes', { ascending: false });

	if (features && features.length > 0) {
		return {
			props: {
				features,
				profile,
			},
		};
	} else {
		return {
			props: {
				features: [],
				error,
			},
		};
	}
}

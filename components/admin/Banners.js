import { Fragment } from 'react';
import { Box, chakra, Heading, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import capitalize from 'lodash.capitalize';
import { format, formatDistance } from 'date-fns';

export default function Banners(props) {
	const { banners, profile } = props;

	return (
		<VStack w='full' spacing={8}>
			{banners.map((banner) => {
				return (
					<Fragment key={banner.id}>
						<Box w='full'>
							<Heading as='h3' fontSize='2xl' mb={4}>
								{banner.title}
							</Heading>
							<chakra.div
								d='flex'
								alignItems='center'
								justifyContent='start'
								mb={8}
								w='full'
							>
								<Text color='brand.200'>
									<NextLink
										href={`/banner/edit?id=${banner.id}`}
									>
										Edit
									</NextLink>
								</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text fontSize='sm'>
									{capitalize(banner.status)}
								</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text fontSize='sm'>{profile?.name}</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text
									fontSize='sm'
									title={format(
										new Date(banner.updated_at),
										'PPPpp'
									)}
								>
									{formatDistance(
										new Date(banner.updated_at),
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
									__html: banner.content,
								}}
							/>
						</Box>
					</Fragment>
				);
			})}
		</VStack>
	);
}

import { Fragment } from 'react';
import { Box, chakra, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import capitalize from 'lodash.capitalize';
import { format, formatDistance } from 'date-fns';

export default function Changelogs(props) {
	const { changelogs, profile } = props;

	return (
		<VStack w='full' spacing={8}>
			{changelogs.map((changelog, index) => {
				return (
					<Fragment key={changelog.id}>
						<Box w='full'>
							<Heading as='h3' fontSize='2xl' mb={4}>
								{changelog.title}
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
										href={`/dashboard/changelog/edit?id=${changelog.id}`}
									>
										Edit
									</NextLink>
								</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text fontSize='sm'>
									{capitalize(changelog.status)}
								</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text fontSize='sm'>{profile?.name}</Text>
								&nbsp;&nbsp;&middot;&nbsp;&nbsp;
								<Text
									fontSize='sm'
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
						{index < changelogs.length - 1 ? <Divider /> : null}
					</Fragment>
				);
			})}
		</VStack>
	);
}

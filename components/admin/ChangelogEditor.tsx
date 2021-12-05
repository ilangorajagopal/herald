import { Box, Button, Divider, HStack, Input, VStack } from '@chakra-ui/react';
import { EditorContent } from '@tiptap/react';
import EditorToolbar from './EditorToolbar';

function ChangelogEditor(props) {
	const { editor, publishChangelog, saveChangelog, setTitle, title } = props;

	return (
		<VStack w='full' spacing={8}>
			<Input
				borderRadius='lg'
				h={16}
				fontSize='xl'
				defaultValue={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='New Update'
			/>
			<Divider />
			<Box w='full' h='auto' minH='600px'>
				<EditorToolbar editor={editor} />
				<EditorContent editor={editor} />
			</Box>
			<HStack
				w='full'
				d='flex'
				alignItems='center'
				justifyContent='flex-end'
				spacing={4}
			>
				<Button onClick={saveChangelog}>Save</Button>
				<Button colorScheme='brand' onClick={publishChangelog}>
					Publish
				</Button>
			</HStack>
		</VStack>
	);
}

export default ChangelogEditor;

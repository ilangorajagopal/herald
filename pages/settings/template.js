import { useEffect, useState } from 'react';
import {
	chakra,
	Box,
	VStack,
	useToast,
	Button,
	HStack,
} from '@chakra-ui/react';
import SettingsLayout from '../../components/layouts/Settings';
import EditorToolbar from '../../components/admin/EditorToolbar';
import { EditorContent, useEditor } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { supabase } from '../../lib/supabaseClient';
import { fetchUserProfile } from '../../lib/utils';

function MyTemplate() {
	const [templateContent, setTemplateContent] = useState('');
	const [user, setUser] = useState(null);

	const editor = useEditor({
		templateContent,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			Heading.configure({ levels: [1, 2, 3] }),
			Link.configure({ openOnClick: false }),
			StarterKit,
		],
		onUpdate() {
			const html = this.getHTML();
			setTemplateContent(html);
		},
	});
	const toast = useToast();

	useEffect(() => {
		async function fetchChangelogTemplate() {
			const user = supabase.auth.user();
			fetchUserProfile(user?.id)
				.then((res) => {
					setUser(res?.data);
				})
				.catch((error) => {
					console.log(error);
				});
			const { data, error } = await supabase
				.from('profiles')
				.select('my_template')
				.match({ id: user?.id })
				.single();

			if (data) {
				setTemplateContent(data.my_template);
				if (editor.isEmpty) {
					editor.commands.setContent(data.my_template);
				}
			} else {
				console.log(error);
			}
		}

		if (editor) {
			fetchChangelogTemplate().then(() => {});
		}
	}, [editor]);

	async function saveChangelogTemplate() {
		const { data, error } = await supabase
			.from('profiles')
			.update({ my_template: templateContent })
			.match({ id: user.id });

		if (data) {
			toast({
				title: 'Saved!',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-right',
			});
		} else {
			// throw error
			console.log(error);
		}
	}

	return (
		<SettingsLayout>
			<VStack w='full' alignItems='start' spacing={8}>
				<chakra.h2 fontSize='2xl'>Your Changelog Template</chakra.h2>
				<Box w='full' h='auto' minH='600px'>
					<EditorToolbar editor={editor} />
					<EditorContent editor={editor} />
				</Box>
				<HStack
					w='full'
					d='flex'
					alignItems='center'
					justifyContent='flex-start'
					spacing={4}
				>
					<Button colorScheme='brand' onClick={saveChangelogTemplate}>
						Save
					</Button>
				</HStack>
			</VStack>
		</SettingsLayout>
	);
}

export default MyTemplate;

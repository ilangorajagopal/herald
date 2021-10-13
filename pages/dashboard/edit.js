import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
	chakra,
	Button,
	VStack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { FaChevronLeft } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import DefaultLayout from '../../components/layouts/Default';
import ChangelogEditor from '../../components/admin/ChangelogEditor';
import { saveChangelog, publishChangelog } from '../../lib/utils';

function Edit() {
	const router = useRouter();
	const {
		query: { id },
	} = router;
	const [changelog, setChangelog] = useState(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const editor = useEditor({
		content,
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
			setContent(html);
		},
	});
	const toast = useToast();

	useEffect(() => {
		async function fetchChangelog() {
			const { data, error } = await supabase
				.from('changelogs')
				.select()
				.match({ id })
				.single();

			if (data) {
				setChangelog(data);
				setTitle(data.title);
				setContent(data.content);
				if (editor.isEmpty) {
					editor.commands.setContent(data.content);
				}
			} else {
				console.log(error);
			}
		}

		if (editor) {
			fetchChangelog().then(() => {});
		}
	}, [editor]);

	async function saveHandler() {
		await saveChangelog(title, content, changelog, setChangelog);
		toast({
			title: 'Saved!',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right',
		});
	}

	async function publishHandler() {
		await publishChangelog(title, content, changelog, setChangelog);
		toast({
			title: 'Published!',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top-right',
		});
		await router.push('/dashboard');
	}

	return (
		<DefaultLayout>
			<VStack
				py={8}
				w='full'
				d='flex'
				alignItems='start'
				justifyContent='start'
				spacing={8}
			>
				<chakra.a>
					<NextLink href='/dashboard'>
						<Button
							variant='outline'
							borderWidth={1}
							borderColor={useColorModeValue('gray.400', 'white')}
							color={useColorModeValue('gray.400', 'white')}
							w={10}
							h={10}
							p={0}
						>
							<FaChevronLeft />
						</Button>
					</NextLink>
				</chakra.a>
				<ChangelogEditor
					editor={editor}
					publishChangelog={publishHandler}
					saveChangelog={saveHandler}
					setTitle={setTitle}
					title={title}
				/>
			</VStack>
		</DefaultLayout>
	);
}

export default Edit;

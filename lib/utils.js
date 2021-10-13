import { supabase } from './supabaseClient';

export async function saveChangelog(title, content, changelog, setChangelog) {
	if (changelog) {
		// update existing record with latest content
		const update = { title, content, status: 'draft' };
		const { data, error } = await supabase
			.from('changelogs')
			.update(update)
			.match({ id: changelog.id });

		if (data && data.length > 0) {
			setChangelog(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	} else {
		// insert latest content as a new draft changelog
		const user = supabase.auth.user();
		const record = { title, content, status: 'draft', author: user.id };
		const { data, error } = await supabase
			.from('changelogs')
			.insert([record]);

		if (data && data.length > 0) {
			setChangelog(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	}
}

export async function publishChangelog(
	title,
	content,
	changelog,
	setChangelog
) {
	if (changelog) {
		// update existing record with latest content
		const update = { title, content, status: 'live' };
		const { data, error } = await supabase
			.from('changelogs')
			.update(update)
			.match({ id: changelog.id });

		if (data && data.length > 0) {
			setChangelog(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	} else {
		// insert latest content as a new published changelog
		const user = supabase.auth.user();
		const record = {
			title,
			content,
			status: 'live',
			author: user.id,
		};
		const { data, error } = await supabase
			.from('changelogs')
			.insert([record]);

		if (data && data.length > 0) {
			setChangelog(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	}
}

export async function fetchUserProfile(id) {
	return await supabase.from('profiles').select().match({ id }).single();
}

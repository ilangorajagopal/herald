import { supabase } from './supabaseClient';

export async function saveBanner(bannerData, banner, setBanner) {
	if (banner) {
		// update existing record with latest content
		const update = { ...bannerData, status: 'draft' };
		const { data, error } = await supabase
			.from('banners')
			.update(update)
			.match({ id: banner.id });

		if (data && data.length > 0) {
			setBanner(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	} else {
		// insert latest content as a new draft banner
		const user = supabase.auth.user();
		const record = { ...bannerData, status: 'draft', author: user.id };
		const { data, error } = await supabase.from('banners').insert([record]);

		if (data && data.length > 0) {
			setBanner(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	}
}

export async function publishBanner(bannerData, banner, setBanner) {
	if (banner) {
		// update existing record with latest content
		const update = { ...bannerData, status: 'live' };
		const { data, error } = await supabase
			.from('banners')
			.update(update)
			.match({ id: banner.id });

		if (data && data.length > 0) {
			setBanner(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	} else {
		// insert latest content as a new published banner
		const user = supabase.auth.user();
		const record = {
			...bannerData,
			status: 'live',
			author: user.id,
		};
		const { data, error } = await supabase.from('banners').insert([record]);

		if (data && data.length > 0) {
			setBanner(data[0]);
		} else {
			// throw error
			console.log(error);
		}
	}
}

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

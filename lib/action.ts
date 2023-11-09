import { supabase } from '@/utils/supabase/supabaseClient';

export async function createContent(contentData: {
	id: number;
	created_at: Date;
	title: string;
	description: string;
	price: number;
	category_id: number;
}) {
	try {
		const { data, error } = await supabase
			.from('content')
			.insert([
				{
					id: contentData.id,
					created_at: contentData.created_at,
					title: contentData.title,
					description: contentData.description,
					price: contentData.price,
					category_id: contentData.category_id,
				},
			])
			.select();

		if (error) {
			throw error;
		}

		return data;
	} catch (err) {
		console.log('Database error: ', err);
		return null;
	}
}

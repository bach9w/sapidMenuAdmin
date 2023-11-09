import { unstable_noStore as noStore } from 'next/cache';
import { supabase } from '@/utils/supabase/supabaseClient';

export async function fetchCategories() {
	noStore();
	try {
		const { data, error } = await supabase.from('category').select('*');
		if (error) {
			throw error;
		}
		return data;
	} catch (err) {
		console.log('Database error: ', err);
		return null;
	}
}

'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Button } from '../button';

interface Category {
	id: number;
	title: string;
}

export default function CategoryMap() {
	const [categories, setCategories] = useState<Category[]>([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase.from('category').select('*');
			if (error) {
				console.log(error);
			} else {
				setCategories(data);
			}
		};
		fetchCategories();
	}, []);

	async function deleteCategory(id: number) {
		const { error } = await supabase.from('category').delete().eq('id', id);
		if (error) {
			console.log(error);
		} else {
			setCategories(categories.filter((category) => category.id !== id));
		}
	}

	return (
		<div className="text-center bg-sky-700">
			<h1>LIST OF ALL CATEGORIES</h1>
			<div className="h-auto w-full absolute justify-center object-center items-center">
				<div></div>
				{categories.map((content) => (
					<div className="bg-white mt-5 rounded-md">
						<div className="text-center bg-yellow-500 font-bold static">
							{content.title}
							<Button
								className="bg-red-500 absolute right-0"
								onClick={() => deleteCategory(content.id)}
							>
								{' '}
								DELETE{' '}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

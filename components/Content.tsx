'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabaseClient';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';

interface Content {
	id: number;
	title: string;
	description: string;
	category_id: number;
	price: number;
}

async function fetchTitleById(id: number): Promise<string | null> {
	const { data, error } = await supabase
		.from('category')
		.select('title')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data?.title ?? null;
}

export const List = () => {
	const [content, setContent] = useState<Content[]>([]);
	const [titles, setTitles] = useState<{ [key: number]: string }>({});

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const categoryId = searchParams.get('categoryId');
		fetchContent(categoryId);
	}, [searchParams]);

	useEffect(() => {
		content.forEach(async (item) => {
			const title = await fetchTitleById(item.category_id);
			setTitles((prev) => ({ ...prev, [item.category_id]: title }));
		});
	}, [content]);

	const fetchContent = async (categoryId: string | null) => {
		let query = supabase.from('content').select('*');
		if (categoryId) {
			query = query.eq('category_id', categoryId);
		}
		const { data, error } = await query;

		if (error) {
			console.error(error);
		} else {
			setContent(data);
		}
	};
	async function deleteProduct(id: number) {
		const { error } = await supabase.from('content').delete().eq('id', id);
		if (error) {
			console.log(error);
		} else {
			setContent(content.filter((content) => content.id !== id));
		}
	}

	return (
		<>
			<article className="grid grid-cols-1 sm:grid-cols-3 gap-4  items-start sm:space-x-4 p-3">
				{content.length > 0 ? (
					content.map((item) => (
						<div
							key={item.id}
							className="min-w-0 bg-slate-50 shadow-md rounded-md hover:bg-slate-200 hover:text-orange-900 font-semibold"
						>
							<div className="mt-3 items-center text-center space-y-1">
								<h4 className="font-semibold text-orange-900 truncate pr-20">
									{item.title}
								</h4>
								<p className="text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
							<div className="w-1/3 sm:w-auto absolute mt-[130px] sm:mt-0 sm:top-2 right-0 sm:relative items-center bg-slate-500 text-white rounded-lg text-center space-x-5 text-lg">
								{item.price} ЛВ
							</div>
							<Separator className="my-5 h-auto sm:my-5 p-3 ">
								{titles[item.category_id] || 'Зарежда се...'}
							</Separator>
							<div className="mb-10 sm:mb-0 sm:bottom-[-50px] bottom-[-20px]">
								<Button
									className="font-bold ml-0 mr-0 w-1/3 sm:w-1/2 sm:mr-0 sm:ml-0"
									variant="destructive"
								>
									EDIT
								</Button>
								<Button
									className="font-bold ml-0 mr-0 w-1/3 sm:w-1/2 sm:mr-0 sm:ml-0"
									onClick={() => deleteProduct(item.id)}
								>
									DELETE
								</Button>
							</div>
						</div>
					))
				) : (
					<p>Няма намерени артикули.</p>
				)}
			</article>
		</>
	);
};

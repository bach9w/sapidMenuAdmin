'use client';

type NoteType = {
	id: number;
	title: string; // Примерен тип, ако вашите бележки имат 'id' и 'title'
	// Добавете всички други необходими полета
};

import qs from 'query-string';

import { supabase } from '../utils/supabase/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '../utils/utils';

interface CategoryProps {
	data: NoteType[];
}

import { useEffect, useState } from 'react';

export const Categories = () => {
	const [categories, setCategories] = useState<NoteType[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase.from('category').select('*');
			if (error) {
				console.error(error);
			} else {
				setCategories(data);
			}
		};
		fetchCategories();
	}, []);

	const router = useRouter();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get('categoryId');
	const onClick = (id: string | undefined) => {
		const query = { categoryId: id };
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipNull: true },
		);
		router.push(url);
	};
	return (
		<div className="justify-center min-w-0 w-auto overflow-x-auto space-x-2 flex p-1 text-white ">
			<button
				onClick={() => onClick(undefined)}
				className={cn(
					`
          flex 
          items-center 
          text-center 
          text-xs
		  
          md:text-lg
          px-2 
          md:px-4
          py-2 
          md:py-3 
          rounded-md 
          bg-orange-500 
          hover:bg-orange-700 
          transition
		  mt-5
        `,
					!categoryId ? 'bg-orange-600' : 'bg-orange-500',
				)}
			>
				ВСИЧКИ
			</button>
			{categories.map((category) => (
				<button
					onClick={() => onClick(category.id.toString())}
					className={cn(
						`
            flex 
            items-center 
            text-center 
            text-xs
			p-2
            md:text-lg
            px-2 
            md:px-4 
            py-2 
            md:py-3 
            rounded-md 
            bg-primary/10 
            hover:bg-orange-700
            transition
			mt-5
          `,
						category.id === Number(categoryId)
							? 'bg-orange-600'
							: 'bg-orange-500',
					)}
					key={category.id}
				>
					{category.title}
				</button>
			))}
		</div>
	);
};

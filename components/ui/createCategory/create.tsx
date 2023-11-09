'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import MapPage from '../productMap/map';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
type CategoryType = {
	id: number;
	title: string;
};

function CreateCategoryPage() {
	const [title, setTitle] = useState('');

	async function createCategory() {
		console.log('Title: ', title);

		if (!title) {
			alert('Моля, попълнете всички полета.');
			return;
		}

		try {
			const { data, error } = await supabase
				.from('category')
				.insert([
					{
						title: title,
					},
				])
				.single();
			if (error) throw error;
			window.location.reload();
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	}

	return (
		<>
			<div className=" mb-10 flex justify-center items-top">
				<div className="h-full w-auto ">
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Create category</CardTitle>
							<CardDescription>Add new category</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="title">Name</Label>
										<Input
											id="title"
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Name of your category"
										/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Cancel</Button>
							<Button onClick={(e) => createCategory()}>Add</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
}

export default CreateCategoryPage;

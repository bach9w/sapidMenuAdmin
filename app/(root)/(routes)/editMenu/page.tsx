'use client';

import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function Notes() {
	const router = useRouter();
	const params = useParams();
	return (
		<>
			<Header />
			<div className="h-screen m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800">
				<div className=" absolute ">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button className="mt-14 ml-5 font-bold" variant="destructive">
									EDIT MENU
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>ADD | REMOVE | EDIT</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="absolute right-10 bottom-10">
					<Button onClick={() => router.push(`/editMenu/${params.itemId}`)}>
						<Save className="mr-2 h-4 w-4 " />
						Save
					</Button>
				</div>
				<div className="absolute left-10 bottom-10">
					<Button>
						<Plus className="mr-2 h-4 w-4 " />
						Add new
					</Button>
				</div>
				<div className="relative h-auto w-auto">Form</div>
			</div>
		</>
	);
}

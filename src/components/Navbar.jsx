import React, { useEffect, useId, useState } from 'react';
import searchSVG from '../images/searchSVG.svg';
import like from '../images/like.svg';
import circle from '../images/circles.svg';
import Item from './Item';
import { render } from '@testing-library/react';
import { MdDelete } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

const Navbar = () => {
	const [checked, setChecked] = useState(null);
	const [percent, setPercent] = useState(null);
	const [task, setTask] = useState(null);
	const [items, setItems] = useState([]);
	useEffect(() => {
		const checkedElements = items.filter(
			(element) => element.completed == true,
		);
		if (checkedElements) {
			setChecked(checkedElements.length);
		} else {
			setChecked(0);
		}
	}, [items]);
	useEffect(() => {
		const renderItems = JSON.parse(localStorage.getItem('items'));
		if (!renderItems) {
			setItems([]);
			return;
		}
		setItems(renderItems);
	}, [items]);
	const handleCheck = (check_id) => {
		const checkedItems = [...items];
		for (let i = 0; i < checkedItems.length; i++) {
			if (checkedItems[i].id == check_id) {
				checkedItems[i].completed = !checkedItems[i].completed;
			}
		}

		setItems(checkedItems);
		localStorage.setItem('items', JSON.stringify(checkedItems));
	};
	const handleDelte = (delete_id) => {
		const newData = items.filter((element) => {
			return element.id != delete_id;
		});
		localStorage.setItem('items', JSON.stringify(newData));
		setItems(newData);
	};

	const unique_id = uuid();
	const handleChange = () => {
		const small_id = unique_id.slice(0, 8);
		if (!task) {
			alert('Enter Task');
			return;
		}

		const obj = { task, completed: false, id: small_id };
		localStorage.setItem('items', JSON.stringify([...items, obj]));
		setItems([...items, obj]);
		setTask('');
	};
	return (
		<div className='min-h-screen bg-zinc-800 p-6 text-white'>
			<section className='bg-blue-400 p-0 rounded-lg mb-6 flex items-center'>
				<img
					src={circle}
					className='-mr-12'
				/>
				<div>
					<h1 className='text-xl font-semibold'>Your Daily Goal Almost Done</h1>
					<p className='text-sm'>
						{items.length > 0
							? `${checked} of ${items.length} Completed`
							: '0 of 0 Completed'}
					</p>
					<div
						className='w-full mt-2 bg-zinc-800 h-2.5 rounded-md my-2'
						value={50}
					/>
					<div className='text-right text-sm font-semibold mt-1'>
						{items.length > 0 ? `${(checked / items.length) * 100} %` : '0%'}
					</div>
				</div>
			</section>
			<section className='mb-6'>
				<h2 className='text-lg font-semibold mb-4'>Today's Goal</h2>
				<h2 className='svg font-semibold float-end'> </h2>
				<br />

				<div className='space-y-4'>
					<div className='space-y-4'></div>
					{items.length > 0 ? (
						items.map((element, index) => {
							return (
								<div
									className={`flex justify-center bg-slate-700 p-3 rounded-lg ${
										element.completed && 'line-through'
									} gap-10`}>
									<span>{element.task}</span>
									<MdDelete onClick={() => handleDelte(element.id)} />
									<input
										checked={element.completed}
										type='checkbox'
										onChange={() => handleCheck(element.id)}
									/>
								</div>
							);
						})
					) : (
						<div>No Tasks</div>
					)}
				</div>
				<div>
					<input
						style={{
							outline: 'none',
						}}
						value={task}
						onChange={(e) => setTask(e.target.value)}
						className='w-full p-5 m-2 border-gray-50 rounded-lg bg-slate-500'
						type='text'
						placeholder='Enter Goal'
					/>
					<button
						onClick={handleChange}
						className=' w-full p-5 m-2 border-gray-50 rounded-lg bg-black'>
						+
					</button>
				</div>
			</section>
			<section className='flex items-center justify-between bg-orange-500 p-4 rounded-3xl mb-6'>
				<p className='bg-white text-rose-800 rounded-3xl text-xs p-1 '>
					Track{' '}
				</p>
				<div className='flex-grow text-center'>
					<span>Swipe to track all</span>
				</div>
				<p className='text-white' />
				<p className='text-white' />
				<p className='text-white' />
			</section>
			<section className='mb-6'>
				<p className='w-full h-[200px] ' />
			</section>
			<nav className='flex justify-between'>
				<p className='text-orange-400' />
				<span>Page1</span>
				<p className='text-gray-400' />
				<span>Page2</span>
				<p className='text-gray-400' />
				<span>Page3</span>
				<p className='text-gray-400' />
				<span>Page4</span>
			</nav>
		</div>
	);
};

export default Navbar;

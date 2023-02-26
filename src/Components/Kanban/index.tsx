import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProjectById } from '../../API/ProjectAPI';
import { createBoard, fetchBoards, removeBoard } from '../../API/BoardsAPI';

import { IBoard, IProjectModel } from '../../Models';
import { Loader, Button } from '../../UI';
import { BoardCard } from '../../Components';

import styles from './kanban.module.scss';

const Kanban = () => {
	const [project, setProject] = useState<IProjectModel>();
	const [boards, setBoards] = useState<IBoard[]>([]);
	const [pending, setPending] = useState<boolean>(false);

	const { id } = useParams<string>();

	const onFetch = useCallback(() => {
		setPending(true);
		fetchProjectById(id).then((data) => {
			setProject(data);
		});
		fetchBoards(id).then((data) => {
			setBoards(data);
			setPending(false);
		});
	}, [id]);

	useEffect(() => {
		onFetch();
	}, [onFetch]);

	const onRemove = (id: string) => {
		removeBoard(id);
		const filteredBoards = boards.filter((board) => board._id !== id);
		setBoards(filteredBoards);
	};

	const onCreate = () => {
		createBoard(id).then((data) => setBoards((prev) => [...prev, data]));
	};

	if (pending) return <Loader />;
	return (
		<div className={styles.kanbanWrapper}>
			<div className={styles.kanbanHeader}>
				<h1 className={styles.kanbanHeaderTitle}>{project?.title}</h1>
				<p className={styles.kanbanHeaderDescription}>{project?.description}</p>
				<Button onClick={onCreate} color='black' content='Add new board'/>
			</div>
			<div className={styles.kanbanSections}>
				{boards.map((board) => (
					<BoardCard
						onRemove={() => onRemove(board._id)}
						id={board._id}
						key={board._id}
						title={board.title}
					/>
				))}
			</div>
		</div>
	);
};

export default Kanban;

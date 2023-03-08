import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';

import { IProjectCard } from './ProjectCard.types';

import styles from './projectСard.module.scss';
import { Button, TextField } from '../../UI';

import { updateProject } from '../../API/ProjectAPI';

const ProjectCard: FC<IProjectCard> = ({
	color,
	title,
	description,
	id,
	routing,
	onRemove,
}) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [updatedTitle, setUpdatedTitle] = useState<string>(title);
	const [updatedDescription, setUpdatedDescription] =
		useState<string>(description);

	const onChangeEdit = () => {
		if (isEdit) {
			const form = {
				title: updatedTitle,
				description: updatedDescription,
			};
			updateProject(id, form);
		}
		setIsEdit(!isEdit);
	};

	const onChangeUpdatedTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedTitle(e.target.value);
	};

	const onChangeUpdatedDescription = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUpdatedDescription(e.target.value);
	};

	return (
		<div className={`${styles.card} ${styles[color]}`}>
			<div className={styles.icons}>
				<MdEdit
					className={
						isEdit ? styles.editActive : styles.edit
					}
					onClick={onChangeEdit}
				/>
				<ImCross className={styles.remove} onClick={onRemove} />
			</div>
			{isEdit ? (
				<>
					<TextField
						className={styles.title}
						onChange={onChangeUpdatedTitle}
						color='black'
						value={updatedTitle}
					/>
					<TextField
						onChange={onChangeUpdatedDescription}
						value={updatedDescription}
						color='black'
					/>
				</>
			) : (
				<>
					<h1 className={styles.title}>{updatedTitle}</h1>
					<p className={styles.description}>{updatedDescription}</p>
				</>
			)}

			{routing && !isEdit && (
				<Link to={routing}>
					<Button
						className={styles.button}
						color='black'
						content='Open'
					/>
				</Link>
			)}
		</div>
	);
};

export default ProjectCard;

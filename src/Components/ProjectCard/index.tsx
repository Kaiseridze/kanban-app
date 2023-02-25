import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';

import { IProjectCard } from './ProjectCard.types';

import styles from './projectСard.module.scss';
import { Button } from '../../UI';

const ProjectCard: FC<IProjectCard> = ({
	color,
	title,
	description,
	id,
	routing,
	onRemove,
	onEdit,
}) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [updatedTitle, setUpdatedTitle] = useState<string>(title);
	const [updatedDescription, setUpdatedDescription] =
		useState<string>(description);

	const onChangeEdit = () => {
		if (isEdit) {
			onEdit(id, { title: updatedTitle, description: updatedDescription });
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
		<div className={`${styles.projectCard} ${styles[color]}`}>
			<div className={styles.projectCardIcons}>
				<MdEdit className={styles.editProjectCard} onClick={onChangeEdit} />
				<ImCross className={styles.removeProjectCard} onClick={onRemove} />
			</div>
			{isEdit ? (
				<input
					onChange={onChangeUpdatedTitle}
					value={updatedTitle}
					type='text'
				/>
			) : (
				<h1 className={styles.projectCardTitle}>{updatedTitle}</h1>
			)}
			{isEdit ? (
				<input
					onChange={onChangeUpdatedDescription}
					value={updatedDescription}
					type='text'
				/>
			) : (
				<p className={styles.projectCardDescription}>{updatedDescription}</p>
			)}
			{routing && (
				<Link to={routing}>
					<Button className={styles.projectCardButton} color='black' content='Open' />
				</Link>
			)}
		</div>
	);
};

export default ProjectCard;

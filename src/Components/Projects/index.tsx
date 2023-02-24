import { useState, useEffect } from 'react';

import { Card } from '../../Entities';
import { Button, Loader } from '../../UI';

import {
	fetchProjects,
	removeProject,
	createProject,
} from '../../API/ProjectAPI';

import { IProjectModel } from '../../Models';

import styles from './projects.module.scss';

const Projects = () => {
	const [data, setData] = useState<IProjectModel[]>([]);
	const [pending, setPending] = useState<boolean>(false);

	useEffect(() => {
		setPending(true);
		fetchProjects().then((data: IProjectModel[]) => {
			setPending(false);
			setData(data);
		});
	}, []);

	const onRemove = (id: string) => {
		removeProject(id);
		const filteredItems = data.filter((item) => item._id !== id);
		setData(filteredItems);
	};

	const onCreate = () => {
		createProject().then((data: IProjectModel) =>
			setData((prev) => [...prev, data])
		);
	};

	if (pending) return <Loader />;

	return (
		<div className={styles.projectsWrapper}>
			<Button onClick={onCreate} color='white' content='Add new projects' />
			<div className={styles.projects}>
				{data.map((project) => (
					<Card
						key={project._id}
						title={project.title}
						description={project.description}
						color='white'
						routing={`/project/${project._id}`}
						removeable={() => onRemove(project._id)}
					/>
				))}
			</div>
		</div>
	);
};

export default Projects;

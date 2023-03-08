import axios from '../axios';
import { IProjectModel } from '../Models';

export const fetchProjects = async () => {
	const { data } = await axios.get('/projects');
	return data as IProjectModel[];
};

export const fetchProjectById = async (id: string | undefined) => {
	const { data } = await axios.get(`/projects/${id}`);
	return data as IProjectModel;
};

export const removeProject = async (id: string) => {
	await axios.delete(`/projects/${id}`);
};

export const createProject = async () => {
	const { data } = await axios.post('/projects');
	return data as IProjectModel;
};

export const updateProject = async (
	id: string,
	{ title, description }: { title: string; description: string }
) => {
	const { data } = await axios.patch(`/projects/${id}`, { title, description });
	return data as IProjectModel;
};

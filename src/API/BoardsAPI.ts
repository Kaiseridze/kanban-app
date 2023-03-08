import axios from '../axios';
import { IBoardModel } from '../Models';

export const fetchBoards = async (id: string | undefined) => {
	const { data } = await axios.get(`/boards/${id}`);
	return data as IBoardModel[];
};

export const createBoard = async (id: string | undefined) => {
	const { data } = await axios.post(`/boards/`, { project_id: id });
	return data as IBoardModel; 
};

export const updateBoard = async (id: string, { title }: { title: string }) => {
	const { data } = await axios.patch(`/boards/${id}`, { title });
	return data as IBoardModel;
};

export const removeBoard = async (id: string) => {
	await axios.delete(`/boards/${id}`);
};

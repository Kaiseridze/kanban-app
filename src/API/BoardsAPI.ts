import axios from '../axios';

export const fetchBoards = async (id: string | undefined) => {
	const { data } = await axios.get(`/boards/${id}`);
	return data;
};

export const updateBoard = async (id: string, { title }: { title: string }) => {
	const { data } = await axios.patch(`/boards/${id}`, { title });
	return data;
};

export const removeBoard = async (id: string) => {
	await axios.delete(`/boards/${id}`);
};

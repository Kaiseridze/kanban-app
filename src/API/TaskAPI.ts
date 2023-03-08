import axios from "../axios";
import { ITaskModel } from "../Models";

export const createTask = async (boardId: string) => {
    const { data } = await axios.post(`/tasks`, {board_id: boardId});
    return data as ITaskModel;
};

export const updatePosition = async (boardId: string, tasks: ITaskModel[]) => {
    await axios.patch(`/tasks/${boardId}`, tasks)
}

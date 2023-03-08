import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import { fetchProjectById } from "../../API/ProjectAPI";
import { createBoard, fetchBoards, removeBoard } from "../../API/BoardsAPI";

import { IBoardModel, IProjectModel } from "../../Models";
import { Loader, Button } from "../../UI";
import { BoardCard } from "../../Components";

import styles from "./kanban.module.scss";
import { createTask, updatePosition } from "../../API/TaskAPI";

const Kanban = () => {
    const [project, setProject] = useState<IProjectModel>();
    const [boards, setBoards] = useState<IBoardModel[]>([]);
    const [pending, setPending] = useState<boolean>(true);

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

    const onRemoveBoard = (id: string) => {
        removeBoard(id);
        const filteredBoards = boards.filter((board) => board._id !== id);
        setBoards(filteredBoards);
    };

    const onCreateBoard = () => {
        createBoard(id).then((data) => setBoards((prev) => [...prev, data]));
    };

    const onCreateTask = (boardId: string) => {
        createTask(boardId).then((data) => {
            const updatedBoards = [...boards];
            const currentBoard = updatedBoards.findIndex(
                (board) => board._id === boardId
            );
            updatedBoards[currentBoard]?.tasks?.push(data);
            setBoards(updatedBoards);
        });
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const updatedBoards = [...boards];
        const sourceColumnIndex = updatedBoards.findIndex(
            (board) => board._id === result.source.droppableId
        );
        const destinationColumnIndex = updatedBoards.findIndex(
            (board) => board._id === result.destination?.droppableId
        );
        const sourceColumn = updatedBoards[sourceColumnIndex];
        const destinationColumn = updatedBoards[destinationColumnIndex];

        const sourceTasks = [...sourceColumn.tasks];
        const destinationTasks = [...destinationColumn.tasks];

        if (result.source.droppableId !== result.destination.droppableId) {
            const [removed] = sourceTasks.splice(result.source.index, 1);
            destinationTasks.splice(result.destination.index, 0, removed);
            updatedBoards[sourceColumnIndex].tasks = sourceTasks;
            updatedBoards[destinationColumnIndex].tasks = destinationTasks;

            setBoards(updatedBoards);
            
            updatePosition(result.destination.droppableId, updatedBoards[destinationColumnIndex].tasks)
            updatePosition(result.source.droppableId, updatedBoards[sourceColumnIndex].tasks)
        }

        if (result.source.droppableId === result.destination.droppableId) {
            const [removed] = destinationTasks.splice(result.source.index, 1);
            destinationTasks.splice(result.destination.index, 0, removed);
            updatedBoards[destinationColumnIndex].tasks = destinationTasks;
            setBoards(updatedBoards);
            updatePosition(
                result.source.droppableId,
                updatedBoards[destinationColumnIndex].tasks
            );
        }
    };

    if (pending) return <Loader />;
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>{project?.title}</h1>
                <p className={styles.description}>
                    {project?.description}
                </p>
                <Button
                    className={styles.button}
                    onClick={onCreateBoard}
                    color="white"
                    content="Add new board"
                />
            </div>
            <div className={styles.sections}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {boards.map((board) => (
                        <BoardCard
                            key={board._id}
                            tasks={board.tasks}
                            onCreateTask={() => onCreateTask(board._id)}
                            onRemove={() => onRemoveBoard(board._id)}
                            id={board._id}
                            title={board.title}
                        />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Kanban;

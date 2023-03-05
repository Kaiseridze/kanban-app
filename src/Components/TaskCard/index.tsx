import { FC } from "react";
import { ITaskCard } from "./TaskCard.types";

import styles from "./taskCard.module.scss";

const TaskCard: FC<ITaskCard> = ({
    title,
    reference,
    dragHandleProps,
    draggableProps,
}) => {
    return (
        <li
            ref={reference}
            {...dragHandleProps}
            {...draggableProps}
            className={styles.taskCard}
        >
            {title}
        </li>
    );
};

export default TaskCard;

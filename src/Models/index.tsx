export interface ITaskModel {
    title: string;
    description: string;
    _id: string
}

export interface IBoardModel {
    title: string;
    description: string;
    project_id: string;
    _id: string;
    tasks: ITaskModel[];
}

export interface IProjectModel {
    title: string;
    description: string;
    _id: string;
    boards: IBoardModel[];
}

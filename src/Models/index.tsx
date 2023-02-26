export interface IBoard {
	title: string;
	description: string;
	project_id: string;
	_id: string;
}

export interface IProjectModel {
	title: string;
	description: string;
	_id: string;
	boards: IBoard[];
}

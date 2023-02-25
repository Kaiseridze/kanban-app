interface IForm {
	title: string;
	description: string;
}

export interface IProjectCard {
	color: 'black' | 'white';
	title: string;
	description: string;
	id: string;
	routing?: string;
	isEdit?: boolean;
	onRemove: React.MouseEventHandler<SVGElement>;
	onEdit: (id: string, form: IForm) => void;
}

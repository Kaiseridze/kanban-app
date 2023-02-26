export interface IProjectCard {
	color: 'black' | 'white';
	title: string;
	description: string;
	id: string;
	routing?: string;
	isEdit?: boolean;
	onRemove: React.MouseEventHandler<SVGElement>;
}

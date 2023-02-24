export interface ICard {
	color: 'black' | 'white';
	title: string;
	description?: string;
	routing?: string;
	removeable?: React.MouseEventHandler<SVGElement>;
}

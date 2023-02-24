import { Routes, Route } from 'react-router-dom';
import { Header, Container } from './Components';
import router from './Router';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Routes>
					{router.map(({ id, href, Page }) => (
						<Route key={id} path={href} element={<Page />}></Route>
					))}
				</Routes>
			</Container>
		</>
	);
}

export default App;

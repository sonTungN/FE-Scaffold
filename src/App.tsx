import { AppRouter } from './app/router';
import { QueryProvider } from './providers/QueryProvider';


function App() {
  return (
		<QueryProvider>
			<AppRouter />
		</QueryProvider>
	);
}

export default App

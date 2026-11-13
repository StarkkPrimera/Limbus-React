import { AppProvider } from './context/AppContext';
import AppRoutes from './app/routes';

export default function App() {
  return <AppProvider><AppRoutes /></AppProvider>;
}

import { useRoutes } from 'react-router-dom';
import { routesSection } from './sections'; // or your file name

const Router = () => {
  const element = useRoutes(routesSection);
  return element;
};

export default Router;

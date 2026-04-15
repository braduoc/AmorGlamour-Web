import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { CategoriaPage } from './pages/CategoriaPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/categoria/:cat",
        Component: CategoriaPage,
      },

      {
        path: 'producto/:id',
        Component: ProductDetail,
      },
      
    ],
  },
]);

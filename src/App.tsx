import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import BlankLayout from './layouts/BlankLayout'
import SigninPage from './pages/auth/SigninPage'
import { redirect } from "react-router-dom";
import SignupPage from './pages/auth/SignupPage';
import PageNotFound from './pages/general/PageNotFoundPage';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/home/HomePage';
import MoviePage from './pages/movie/MoviePage';
import MovieDetailPage from './pages/movie/movie-detail/MovieDetailPage';
import CartContextProvider from './shared/states/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '',
    errorElement: <PageNotFound />,
    element: <Navigate to="/signin" />
  },
  {
    path: '',
    errorElement: <PageNotFound />,
    element: <BlankLayout />,
    children: [
      {
        path: '/signin',
        element: <SigninPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      }
    ]
  },
  {
    path: '',
    element: <AdminLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/movie',
        element: <MoviePage />
      },
      {
        path: '/movie/:imdbID',
        element: <MovieDetailPage />
      }
    ]
  }
])

function App() {
  redirect("/signin");
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </QueryClientProvider>
  )
}

export default App

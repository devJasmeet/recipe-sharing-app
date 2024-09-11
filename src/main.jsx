import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Article, Home, AllArticles , NewArticle, UpdateArticle, UserLogin, UserSignup } from "./components/pages/pages.js"
import AccessLayout from "../src/components/AccessLayout.jsx"

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "login",
        element : (
          <AccessLayout authentication={false}>
            <UserLogin />
          </AccessLayout>
        )
      },
      {
        path : "/signup",
        element : (
          <AccessLayout authentication={false}>
            <UserSignup />
          </AccessLayout>
        )
      },
      {
        path : "/new-article",
        element : (
          <AccessLayout authentication={true}>
            <NewArticle />
          </AccessLayout>
        )
      },
      {
        path : "/update-article/:slug",
        element : (
          <AccessLayout authentication={true}>
            <UpdateArticle />
          </AccessLayout>
        )
      },
      {
        path : "/article/:slug",
        element : (
          <AccessLayout authentication={true}>
            <Article />
          </AccessLayout>
        )
      },
      {
        path : "/all-articles",
        element : (
          <AccessLayout authentication={true}>
            <AllArticles />
          </AccessLayout>
        )
      }
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
 

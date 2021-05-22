import React from "react";
import Homepage from "../components/home/Homepage";
import PostDetail from "../components/post/PostDetail";
import { WelcomPage } from "../components/welcomepage";

export interface PageRoute {
  title: string;
  component: JSX.Element;
  path: string;
  navPath: string;
  showInMenu: boolean;
}

export const routes: PageRoute[] = [
  {
    title: "Home",
    path: "/",
    navPath: "/",
    component: <WelcomPage />,
    showInMenu: true,
  },
  {
    title: "Blog",
    path: "/blog/:id?",
    navPath: "/blog",
    component: <Homepage />,
    showInMenu: true,
  },
  {
    title: "Blog",
    path: "/blog/post/:id?",
    navPath: "/post",
    component: <PostDetail />,
    showInMenu: false,
  },
];

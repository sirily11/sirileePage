/** @format */

import React, { Component } from "react";
import axios from "axios";
import { Post, FetchResult, Category } from "../models/post";
import { getURL } from "../utils/utils";
import { CategoryResult } from "../models/category";

interface State {
  isLoading: boolean;
  posts: Post[];
  categories: Category[];
  fetchPosts(category?: any): Promise<void>;
  fetchCategories(): Promise<void>;
  seletedCategory?: Category;
  nextURL?: string | null;
  fetchNext(): void;
  getPost(id: number): Post | undefined;
}

interface Props {}

//@ts-ignore
const context: State = {};

export const PostContext = React.createContext(context);

export default class PostProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      posts: [],
      seletedCategory: undefined,
      categories: [],
      fetchNext: this.fetchNext,
      getPost: this.getPost,
      fetchPosts: this.fetchPosts,
      fetchCategories: this.fetchCategory,
    };
  }

  /**
   * Fetch all post from internet
   */
  fetchPosts = async (category: any | undefined): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      let url: string | undefined = undefined;
      if (category) {
        url = getURL("post/?category=" + category);
      } else {
        url = getURL("post/");
      }

      let response = await axios.get(url!);
      this.setState({ isLoading: false });
      let data: FetchResult = response.data;

      this.setState({ posts: data.results, nextURL: data.next });
    } catch (err) {
      window.alert("Error: " + err);
    }
  };

  /**
   * Fetch all category from internet
   */
  fetchCategory = async (): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      let url = getURL("category/");
      let response = await axios.get(url);
      let categoryResult: CategoryResult = response.data;
      this.setState({ isLoading: false, categories: categoryResult.results });
    } catch (err) {
      this.setState({ isLoading: false });
      window.alert("Error: " + err);
    }
  };

  getPost(id: number): Post | undefined {
    return this.state.posts.find((post, index, obj) => post.id === id);
  }

  fetchNext = async () => {
    console.log("fetching next");
    const { nextURL } = this.state;
    if (nextURL) {
      try {
        let response = await axios.get(nextURL);
        let data: FetchResult = response.data;
        let posts = this.state.posts;
        posts = posts.concat(data.results);
        this.setState({
          posts: posts,
          nextURL: data.next === null ? undefined : data.next,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  render() {
    return (
      <PostContext.Provider value={this.state}>
        {this.props.children}
      </PostContext.Provider>
    );
  }
}

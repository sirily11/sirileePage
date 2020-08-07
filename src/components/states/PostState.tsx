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
  selectCategory(category?: Category): void;
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
      selectCategory: this.selectCategory,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ posts: [] });
      let postResult = await this.fetchPost();
      let categoryResult = await this.fetchCategory();

      this.setState({
        posts: postResult.results,
        nextURL: postResult.next === null ? undefined : postResult.next,
        categories: categoryResult.results,
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Fetch all post from internet
   */
  private fetchPost = async (): Promise<FetchResult> => {
    try {
      this.setState({ isLoading: true });
      let url = getURL("post/");
      let response = await axios.get(url);
      this.setState({ isLoading: false });
      let data: FetchResult = response.data;
      return data;
    } catch (err) {
      window.alert("Error: " + err);
      return { count: 0, results: [], next: null, previous: null };
    }
  };

  /**
   * Fetch all category from internet
   */
  private fetchCategory = async (): Promise<CategoryResult> => {
    try {
      this.setState({ isLoading: true });
      let url = getURL("category/");
      let response = await axios.get(url);
      let categoryResult: CategoryResult = response.data;
      this.setState({ isLoading: false });
      return categoryResult;
    } catch (err) {
      this.setState({ isLoading: false });
      window.alert("Error: " + err);

      return { count: 0, results: [] };
    }
  };

  getPost(id: number): Post | undefined {
    return this.state.posts.find((post, index, obj) => post.id === id);
  }

  /**
   * Set current category to the selected one
   * Update ui and fetch new post based on the category
   * @param category Selected category, if select all, then this will be undefined
   */
  selectCategory = async (category?: Category) => {
    this.setState({ isLoading: true });
    try {
      // select on of the tab but not all
      if (category) {
        let url = getURL("post/?category=" + category.id);
        let response = await axios.get(url);
        let data: FetchResult = response.data;
        this.setState({ posts: data.results });
      } else {
        let postResult = await this.fetchPost();
        this.setState({ posts: postResult.results });
      }

      this.setState({ seletedCategory: category });
    } catch (err) {
      window.alert("Error: " + err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

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

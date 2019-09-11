import React, { Component } from "react";
import axios from "axios";
import { Post, FetchResult, Category } from "../models/post";
import { getURL } from "../utils/utils";
import { CategoryResult } from "../models/category";

interface State {
  posts: Post[];
  categories: Category[];
  selectCategory(category?: Category): void;
  seletedCategory?: Category;
  nextURL?: string | null;
  fetchNext(url: string): void;
  getPost(id: number): Post | undefined;
}

interface Props {}

const context: State = {
  posts: [],
  categories: [],
  seletedCategory: undefined,
  fetchNext(url: string) {},
  selectCategory(category: Category) {},
  getPost: (id: number) => {
    return undefined;
  }
};

export const PostContext = React.createContext(context);

export default class PostProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      seletedCategory: undefined,
      categories: [],
      fetchNext: this.fetchNext,
      getPost: this.getPost,
      selectCategory: this.selectCategory
    };
  }

  async componentDidMount() {
    try {
      let url = getURL("post/");
      let response = await axios.get(url);
      let data: FetchResult = response.data;

      let urlC = getURL("category/");
      response = await axios.get(urlC);
      let categoryResult: CategoryResult = response.data;

      this.setState({
        posts: data.results,
        nextURL: data.next,
        categories: categoryResult.results
      });
    } catch (err) {
      console.error(err);
    }
  }

  getPost(id: number): Post | undefined {
    return this.state.posts.find((post, index, obj) => post.id == id);
  }

  selectCategory = (category?: Category) => {
    this.setState({ seletedCategory: category });
  };

  async fetchNext(url: string) {
    try {
      let response = await axios.get(url);
      let data: FetchResult = response.data;
      let posts = this.state.posts;
      posts.concat(data.results);
      this.setState({ posts: posts, nextURL: data.next });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <PostContext.Provider value={this.state}>
        {this.props.children}
      </PostContext.Provider>
    );
  }
}

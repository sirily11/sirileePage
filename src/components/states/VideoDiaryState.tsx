/** @format */

import React, { Component } from "react";
import axios from "axios";
import { FetchResult } from "../models/post";
import { getURL } from "../utils/utils";
import { CategoryResult } from "../models/category";
import { Diary } from "../models/diary";

interface State {
  isLoading: boolean;
  videos: Diary[];
  nextURL?: string | null;
  startDate?: string;
  endDate?: string;
  months?: string[];
  fetchNext(): void;
  fetchVideo(time: string | undefined): Promise<void>;
}

interface Props {}

//@ts-ignore
const context: State = {};

export const VideoDiaryContext = React.createContext(context);

export default class VideoDiaryProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      videos: [],
      fetchNext: this.fetchNext,
      fetchVideo: this.fetchVideo,
    };
  }

  /**
   * Fetch all post from internet
   */
  fetchVideo = async (time?: string): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      let url: string | undefined = undefined;
      if (time) {
        url = getURL("video-diary/?time=" + time);
      } else {
        url = getURL("video-diary/");
      }

      let response = await axios.get(url!);
      this.setState({ isLoading: false });
      let data = response.data;
      this.setState({
        videos: data.results,
        nextURL: response.data.next,
        startDate: response.data.start_date,
        endDate: response.data.end_date,
        months: response.data.months,
      });
      console.log(response.data.months);
    } catch (err) {
      window.alert("Error: " + err);
    }
  };

  fetchNext = async () => {
    console.log("fetching next");
    const { nextURL } = this.state;
    if (nextURL) {
      try {
        let response = await axios.get(nextURL);
        let data = response.data;
        let videos = this.state.videos;
        videos = videos.concat(data.results);
        this.setState({
          videos: videos,
          nextURL: data.next === null ? undefined : data.next,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  render() {
    return (
      <VideoDiaryContext.Provider value={this.state}>
        {this.props.children}
      </VideoDiaryContext.Provider>
    );
  }
}

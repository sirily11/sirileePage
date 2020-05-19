import React, { Component } from "react";
import axios from "axios";
import { Post, FetchResult, Category } from "../models/post";
import { RouteComponentProps } from "react-router";
import { getURL, getPodcastURL } from "../utils/utils";
import { CategoryResult } from "../models/category";
import { Playlist, AbstractPlaylist, Video } from "../models/podcast";
import Axios from "axios";

interface State {
  playlist: AbstractPlaylist[];
  currentPlaylist?: Video;
  nextURL?: string | null;
  isLoading: boolean;
  fetchNext(): void;
  fetchPodcast(id: any): Promise<Playlist>;
  play(podcast: Video): void;
  clear(): void;
}

interface Props {}
//@ts-ignore
const context: State = {};

export const PodcastContext = React.createContext(context);

export default class PodcastProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      playlist: [],
      fetchNext: this.fetchNext,
      fetchPodcast: this.fetchPodcast,
      play: this.play,
      clear: this.clear,
    };
  }

  async componentDidMount() {
    try {
      await this.fetchPlaylist();
    } catch (err) {
      console.error(err);
    }
  }
  clear = () => {
    this.setState({ currentPlaylist: undefined });
  };

  play = (podcast: Video) => {
    this.setState({ currentPlaylist: podcast });
  };

  fetchPlaylist = async () => {
    this.setState({ isLoading: true });
    let url = getPodcastURL("playlist");
    let result = await Axios.get(url);
    this.setState({
      nextURL: result.data.next,
      playlist: result.data.results,
      isLoading: false,
    });
  };

  fetchPodcast = async (id: any): Promise<Playlist> => {
    let url = getPodcastURL(`playlist/${id}/`);
    let result = await Axios.get(url);
    return result.data;
  };

  fetchNext = async () => {
    if (this.state.nextURL) {
      this.setState({ isLoading: true });
      let result = await Axios.get(this.state.nextURL);
      const { playlist } = this.state;
      (result.data.results as AbstractPlaylist[]).forEach((p) => {
        playlist.push(p);
      });
      this.setState({
        nextURL: result.data.next,
        playlist: playlist,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <PodcastContext.Provider value={this.state}>
        {this.props.children}
      </PodcastContext.Provider>
    );
  }
}

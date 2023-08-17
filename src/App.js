import photoList from "./PhotoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  const $h1 = document.createElement("h1");
  $h1.innerText = "Cat Photos";
  $h1.style.textAlign = "center";
  $target.appendChild($h1);
  this.state = {
    limit: 5,
    nextstart: 0,
    totalCount: 0,
    photos: [],
    isLoading: false,
  };
  const photoListComponent = new photoList({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
      totalCount: this.state.totalCount,
    },
    onScrollEnded: async () => {
      await fetchPhotos();
    },
  });
  this.setState = (nextState) => {
    this.state = nextState;
    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: nextState.photos,
      totalCount: this.state.totalCount,
    });
  };
  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const { limit, nextstart } = this.state;
    const photos = await request(
      `/cat-photos?_limit=${limit}&_start=${nextstart}`
    );
    this.setState({
      ...this.state,
      nextstart: nextstart + limit,
      photos: this.state.photos.concat(photos),
      isLoading: false,
    });
  };
  const initialize = async () => {
    const totalCount = await request("/cat-photos/count");

    this.setState({
      ...this.state,
      totalCount,
    });
    await fetchPhotos();
  };
  initialize();
}

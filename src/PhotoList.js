export default function photoList({ $target, initialState, onScrollEnded }) {
  let isinitialize = false;
  const $photoList = document.createElement("div");
  $target.appendChild($photoList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (!isinitialize) {
      $photoList.innerHTML = `
    <ul class="PhotoList__photos"></ul>
        `;
      isinitialize = true;
    }
    const { photos } = this.state;
    const $photos = $photoList.querySelector(".PhotoList__photos");

    photos.forEach((photo) => {
      if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.style = `list-style:none;`;
        $li.innerHTML = `<img width="100%" src="${photo.imagePath}"/>`;
        $photos.appendChild($li);
      }
    });
  };
  this.render();

  window.addEventListener("scroll", () => {
    const { isLoading, totalCount, photos } = this.state;
    const isScrollEnded =
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;
    if (isScrollEnded && !isLoading && photos.length < totalCount) {
      onScrollEnded();
    }
  });
}

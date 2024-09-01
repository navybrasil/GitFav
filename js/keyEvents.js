export function setupKeyEvents(favoritesView) {
  function handleKeyPress(event) {
    if (event.key === "Enter" && favoritesView.root) {
      const addButton = favoritesView.root.querySelector(".search button");
      addButton.click();
    }
  }

  window.addEventListener("keydown", handleKeyPress);
}

import { FavoritesView } from "./FavoritesView.js";
import { setupKeyEvents } from "./keyEvents.js";

const favoritesView = new FavoritesView("#app");
setupKeyEvents(favoritesView);

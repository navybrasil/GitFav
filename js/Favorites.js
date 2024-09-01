import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-gitfav:")) || [];

    this.updateEmptyState();
  }

  save() {
    localStorage.setItem("@github-gitfav:", JSON.stringify(this.entries));
    this.updateEmptyState();
  }

  async add(username) {
    try {
      if (this.isUserExists(username))
        throw new Error("Usuário já está cadastrado");

      const user = await GithubUser.search(username);

      if (!user.login) throw new Error("Usuário não encontrado!");

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    this.entries = this.entries.filter((entry) => entry.login !== user.login);
    this.update();
    this.save();
  }

  isUserExists(username) {
    return this.entries.some((entry) => entry.login === username);
  }

  updateEmptyState() {
    const emptyStateElement = this.root.querySelector(".empty-state");
    const hasUsers = this.entries.length > 0;

    if (emptyStateElement) {
      emptyStateElement.classList.toggle("active", !hasUsers);
    }
  }
}

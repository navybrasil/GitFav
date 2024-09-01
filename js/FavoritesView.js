import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onAddButtonClick();
  }

  onAddButtonClick() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
      this.clearInput();
    };
  }

  update() {
    this.clearTableRows();
    this.entries.forEach((user) => this.addRow(user));
    this.updateEmptyState();
  }

  addRow(user) {
    const row = this.createRow(user);
    this.tbody.append(row);
  }

  createRow(user) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
			<td class="user">
				<img
					src="http://github.com/${user.login}.png"
					alt="imagem de ${user.name}"
				/>
				<a href="http://github.com/${user.login}" target="_blank">
					<p>${user.name}</p>
					<span>${user.login}</span>
				</a>
			</td>
			<td class="repositories">${user.public_repos}</td>
			<td class="followers">${user.followers}</td>
			<td><button class="remove"><i class="ph ph-trash"></i></button></td>
	`;

    tr.querySelector(".remove").onclick = () => {
      if (confirm("Tem certeza que deseja deletar essa linha?")) {
        this.delete(user);
      }
    };

    return tr;
  }

  clearTableRows() {
    this.tbody.querySelectorAll("tr").forEach((tr) => tr.remove());
  }

  clearInput() {
    const input = document.getElementById("input-search");

    if (input) {
      input.value = "";
    }
  }
}

const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const data = await resp.json();

  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const data = await resp.json();

  addReposToCard(data);
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><i class="fa fa-users" aria-hidden="true"></i> ${user.followers} Followers</li>
                <li><i class="fas fa-people-arrows"></i></i> ${user.following} Following</li>
                <li><i class="far fa-folder" ></i> ${user.public_repos} Repos</li>
            </ul>

            <h4>Repos:</h4>
            <div class="repos" id="repos">
            </div>
        </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = "";
  }
});

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

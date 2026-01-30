function searchProfile() {
  const username = document.getElementById("username").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username) {
    errorMsg.textContent = "Please enter a username";
    document.getElementById("profile").style.display = "none";
    return;
  }

  errorMsg.textContent = "";

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) throw new Error("User not found");
      return response.json();
    })
    .then(data => {
      const profile = document.getElementById("profile");
      profile.style.display = "block";

      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("name").textContent = data.name || data.login;
      document.getElementById("bio").textContent = data.bio || "No bio available";

      document.getElementById("followers").textContent = `👥 Followers: ${data.followers}`;
      document.getElementById("following").textContent = `➡️ Following: ${data.following}`;
      document.getElementById("repos").textContent = `📦 Repositories: ${data.public_repos}`;

      document.getElementById("profileLink").href = data.html_url;
      document.getElementById("profileLink").textContent = "View Profile";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("profile").style.display = "none";
      errorMsg.textContent = "❌ GitHub user not found";
    });
}

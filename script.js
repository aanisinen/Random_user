document.addEventListener("DOMContentLoaded", function () {
  const errorMessage = document.getElementById("errorMessage");
  const userInfoContainer = document.getElementById("userInfoContainer");
  const userInfoList = document.getElementById("userInfoList");
  const generateButton = document.getElementById("generateButton");
  const resultsInput = document.getElementById("results");

  // Random User Generator API endpoint
  const randomUserApiEndpoint = "https://randomuser.me/api/";

  // Hakee ja näyttää käyttäjätiedot
  function fetchAndDisplayUserInfo(endpoint, results) {
    const fullEndpoint = `${endpoint}?results=${results}`;

    // Tyhjentää aiemmat tulokset ja virheet
    errorMessage.textContent = "";
    userInfoList.innerHTML = "";

    // Hakee käyttäjätiedot API:sta käyttäen XMLHttpRequestia
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fullEndpoint, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Jäsentää JSONin
        const data = JSON.parse(xhr.responseText);

        // Näyttää käyttäjätiedot
        data.results.forEach((user) => {
          const userInfoItems = [
            `Name: ${user.name.first} ${user.name.last}`,
            `Gender: ${user.gender}`,
            `Email: ${user.email}`,
            `Location: ${user.location.city}, ${user.location.country}`,
            `Phone: ${user.phone}`,
          ];

          userInfoItems.forEach((info) => {
            const listItem = document.createElement("li");
            listItem.textContent = info;
            userInfoList.appendChild(listItem);
          });
        });
      } else {
        errorMessage.textContent = "Error fetching user data";
      }
    };

    xhr.onerror = function () {
      errorMessage.textContent = "Error fetching user data";
    };

    // Lähettää pyynnön
    xhr.send();
  }

  // Näyttää käyttäjätiedot sivun latauksessa
  fetchAndDisplayUserInfo(randomUserApiEndpoint, resultsInput.value);

  // Lisää Add event listenerin @ "Generate" nappiin
  generateButton.addEventListener("click", function () {
    fetchAndDisplayUserInfo(randomUserApiEndpoint, resultsInput.value);
  });
});

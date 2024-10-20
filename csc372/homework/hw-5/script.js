myUser = "cism829";

const container = document.querySelector('.container');
const repoCon = document.querySelector('.repo-container');
let allLang = '';

const form = document.querySelector('#form');

form.addEventListener("submit", getUserInput);

getRepos(myUser);

/**
 * Once a valid user is inputted it clears out any old user data in the html
 * @param {SubmitEvent} event 
 */
function getUserInput(event) {
    event.preventDefault();

    const userInput = document.querySelector('#search-input').value;
    console.log(userInput);
    repoCon.innerHTML = '';

    getRepos(userInput);
}

/**
 * passes the username into the url and then fetches through the api
 * @param {String} userName 
 */
function getRepos(userName) {

    let githubUser = userName;
    let apiUrl = "https://api.github.com/users/" + githubUser + "/repos";

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((repoData) => {

            repoExtract(repoData, apiUrl);

        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

/**
 * makes the json data an array and for each element it makes a card to shoe data
 * @param {JSON} repoData 
 * @param {String} apiUrl 
 */
function repoExtract(repoData, apiUrl) {

    let repo = [];
    console.log(repoData.length);

    for (let index = 0; index < repoData.length; index++) {
        repo = repoData[index];
        repoCards(repo, apiUrl);
    }

}

/**
 * Creates the cards for each repository the API offers
 * @param {Array} repo 
 * @param {String} apiUrl 
 */
function repoCards(repo, apiUrl) {

    const repository = document.createElement('div');
    repository.classList.add("repo");

    const header = document.createElement('div');
    header.classList.add("header");

    const image = document.createElement('img');
    image.src = "images/github-logo.svg";

    const title = document.createElement('div');
    title.classList.add("title");

    const hyperLink = document.createElement('a');
    hyperLink.href = repo.html_url;
    hyperLink.target = "_blank";

    const name = document.createElement('h2');
    name.textContent = repo.name;

    const description = document.createElement('div');
    description.classList.add("des");

    const des = document.createElement('p');
    des.textContent = repo.description;

    const info = document.createElement('div');
    info.classList.add("info");

    const commit = document.createElement('p');
    commit.textContent = "Commits: Loading";

    const commitUrl = "https://api.github.com/repos/" + repo.owner.login + "/" + repo.name + "/commits?per_page=100";

    info.appendChild(commit);

    commitRepo(commitUrl, commit);


    const create = document.createElement('p');
    create.textContent = "Created on: " + dateFormat(repo.created_at);

    const update = document.createElement('p');
    update.textContent = "last updated: " + dateFormat(repo.updated_at);



    const oInfo = document.createElement('div');
    oInfo.classList.add("other-info");

    const languages = document.createElement('p');
    languages.textContent = "Languages: ";

    const watch = document.createElement('p');
    watch.textContent = "Watchers: " + repo.watchers_count;

    repoCon.appendChild(repository);

    repository.appendChild(header);
    header.appendChild(image);
    header.appendChild(title);

    hyperLink.appendChild(name);
    title.appendChild(hyperLink);

    repository.appendChild(description);
    description.appendChild(des);

    repository.appendChild(info);
    info.appendChild(update);
    info.appendChild(create);
    info.appendChild(watch);
    info.appendChild(languages);

    // Fetch and display languages
    const langUrl = repo.languages_url;
    getLanguages(langUrl, languages);
}

/**
 * Gets the data from the language api thats nested within the user github api
 * @param {String} langUrl 
 * @param {Element} languagesElement 
 */
function getLanguages(langUrl, languagesElement) {
    fetch(langUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((langData) => {
            langExtract(langData, languagesElement);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

/**
 * Displays the languages found 
 * @param {Json} langData 
 * @param {Element} languagesElement 
 */
function langExtract(langData, languagesElement) {
    allLang = '';

    if (Object.keys(langData).length === 0) {
        allLang = "None";
    } else {

        for (let index = 0; index < Object.keys(langData).length; index++) {
            let language = Object.keys(langData)[index];

            if (language === "Less") {
                continue;
            }

            if (index === Object.keys(langData).length - 1) {
                allLang += language;
            } else {
                allLang += language + ", ";
            }
        }
    }

    languagesElement.textContent = "Languages: " + allLang;
}

/**
 * Formats the date given into MM/DD/YYYY hour:minute am/pm EST
 * and returns them
 * @param {Date} theDate 
 * @returns 
 */
function dateFormat(theDate) {

    const date = new Date(theDate);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    let hours = date.getUTCHours() - 5; //EST
    let timeOfDay = '';
    
    if (hours < 0) {
        hours += 24;
        date.setUTCDate(date.getUTCDate() - 1);
    }

    if (hours >= 12) {
        timeOfDay = 'pm';
        if (hours > 12) {
            hours -= 12;
        }
    } else {
        timeOfDay = 'am';
        if (hours === 0) {
            hours = 12;
        }
    }

    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    let fullTime = (month + "/" + day + "/" + year + " at " + hours + ":" + minutes + timeOfDay);

    return fullTime;

}

/**
 * Accessing the commit Url for a given repository and then creats the html element to display amount of commits
 * @param {String} commitUrl 
 * @param {Element} commitElement 
 */
function commitRepo(commitUrl, commitElement) {
    fetch(commitUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((commitData) => {
            if (commitElement) {
                commitElement.textContent = "Commits: " + commitData.length;
            } else {
                console.error("Commit element is undefined");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            if (commitElement) {
                commitElement.textContent = "Commits: Error fetching data";
            }
        });
}


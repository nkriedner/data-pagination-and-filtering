/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
    const startIndex = page * 9 - 9;
    const endIndex = page * 9;
    const ul = document.querySelector(".student-list");
    ul.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            const li = document.createElement("li");
            li.classList.add("student-item", "cf");
            li.innerHTML = `<div class="student-details">
                              <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
                              <h3>${data[i].name.first} ${data[i].name.last}</h3>
                              <span class="email">${data[i].email}</span>
                           </div>
                           <div class="joined-details">
                              <span class="date">Joined ${data[i].registered.date}</span>
                           </div>`;
            ul.appendChild(li);
        }
    }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
    let numberOfPages = Math.ceil(list.length / 9);
    const ul = document.querySelector(".link-list");
    ul.innerHTML = "";
    for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = i;
        li.appendChild(button);
        ul.appendChild(li);
    }
    ul.firstChild.firstChild.className = "active";
    ul.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") {
            const lis = ul.childNodes;
            // Remove active class from any other button
            for (let i = 0; i < lis.length; i++) {
                console.log(lis[i]);
                if (lis[i].firstChild.className == "active") {
                    lis[i].firstChild.classList.remove("active");
                }
            }
            // Add active class to button that was clicked:
            e.target.className = "active";
            // Call the showPage function
            const pageNumber = parseInt(e.target.textContent);
            showPage(data, pageNumber);
        }
    });
}

// Call functions
showPage(data, 1);
addPagination(data);

// Add a search component
const searchBarLocation = document.querySelector(".header");
// console.log(searchBarLocation);
const label = document.createElement("label");
label.setAttribute("for", "search");
label.className = "student-search";
label.innerHTML = `<span>Search by name</span>
                   <input id="search" placeholder="Search by name...">
                   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
console.log(label);
searchBarLocation.append(label);

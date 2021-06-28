// ARRAY VARIABLE TO HOLD THE DYNAMICALLY CHANGING DATA:
let studentList = data;

// FUNCTION FOR SHOWING THE STUDENT DATA ON THE PAGE:
function showPage(list, page) {
    // Create start and end index for the page:
    const startIndex = page * 9 - 9;
    const endIndex = page * 9;
    // Select the student list place on the page:
    const ul = document.querySelector(".student-list");
    ul.innerHTML = "";
    // Loop through student list data and create html for each student:
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            const li = document.createElement("li");
            li.classList.add("student-item", "cf");
            li.innerHTML = `<div class="student-details">
                              <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                              <h3>${list[i].name.first} ${list[i].name.last}</h3>
                              <span class="email">${list[i].email}</span>
                           </div>
                           <div class="joined-details">
                              <span class="date">Joined ${list[i].registered.date}</span>
                           </div>`;
            ul.appendChild(li);
        }
    }
}

// FUNCTION FOR ADDING THE PAGINATION BUTTON(S) BELOW THE STUDENT DATA:
function addPagination(list) {
    // Set the number of pages:
    let numberOfPages = Math.ceil(list.length / 9);
    // Select the place for the pagination buttons:
    const ul = document.querySelector(".link-list");
    ul.innerHTML = "";
    // Loop through the number of pages and create a button for each page:
    for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = i;
        li.appendChild(button);
        ul.appendChild(li);
    }
    // Check if there are no results and present a message if this is the case:
    if (!ul.firstChild) {
        const noResultMessage = document.createElement("h2");
        noResultMessage.style.fontSize = "2rem";
        noResultMessage.textContent = "No Results for your search query";
        ul.appendChild(noResultMessage);
        return;
    }
    ul.firstChild.firstChild.className = "active";
    // Add an event listener for clicks on the pagination buttons:
    ul.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") {
            const lis = ul.childNodes;
            // Add active class to button clicked and remove active class from any other button
            for (let i = 0; i < lis.length; i++) {
                if (lis[i].firstChild.className == "active") {
                    lis[i].firstChild.classList.remove("active");
                }
            }
            e.target.className = "active";
            // Call the showPage function:
            const pageNumber = parseInt(e.target.textContent);
            showPage(studentList, pageNumber);
        }
    });
}

// SEARCH COMPONENT:
const searchBarLocation = document.querySelector(".header");
const label = document.createElement("label");
label.setAttribute("for", "search");
label.className = "student-search";
label.innerHTML = `<span>Search by name</span>
                   <input id="search" placeholder="Search by name...">
                   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
searchBarLocation.append(label);

// SEARCH COMPONENT FUNCTIONALITY:
const searchInput = searchBarLocation.querySelector("input");
const button = document.querySelector("button");
// Create event listeners for keyups and for clicks on search icon:
searchInput.addEventListener("keyup", () => {
    searchStudents();
});
button.addEventListener("click", () => {
    console.log("CLICK");
    searchStudents();
});

// FUNCTION FOR SEARCH COMPONENT FUNCTIONALITY:
function searchStudents() {
    studentList = [];
    let userInput = searchInput.value.toLowerCase();
    // Loop through data:
    for (let i = 0; i < data.length; i++) {
        if (
            data[i].name.first.toLowerCase().includes(userInput) ||
            data[i].name.last.toLowerCase().includes(userInput)
        ) {
            studentList.push(data[i]);
        }
    }
    showPage(studentList, 1);
    addPagination(studentList);
}

// CALLING SHOWPAGE AND ADDPAGINATION WHEN THE PAGE LOADS:
showPage(data, 1);
addPagination(data);

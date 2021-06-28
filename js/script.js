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
    if (!ul.firstChild) {
        console.log("NO RESULTS");
        const noResultMessage = document.createElement("h2");
        noResultMessage.style.fontSize = "2rem";
        noResultMessage.textContent = "No Results for your search query";
        ul.appendChild(noResultMessage);
        return;
    }
    ul.firstChild.firstChild.className = "active";
    ul.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") {
            const lis = ul.childNodes;
            // Remove active class from any other button
            for (let i = 0; i < lis.length; i++) {
                //  console.log(lis[i]);
                if (lis[i].firstChild.className == "active") {
                    lis[i].firstChild.classList.remove("active");
                }
            }
            // Add active class to button that was clicked:
            e.target.className = "active";
            // Call the showPage function
            const pageNumber = parseInt(e.target.textContent);
            showPage(newStudentList, pageNumber);
        }
    });
}

// Call functions
showPage(data, 1);
addPagination(data);

// Add a search component
const searchBarLocation = document.querySelector(".header");
const label = document.createElement("label");
label.setAttribute("for", "search");
label.className = "student-search";
label.innerHTML = `<span>Search by name</span>
                   <input id="search" placeholder="Search by name...">
                   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
searchBarLocation.append(label);

const searchInput = searchBarLocation.querySelector("input");
const button = document.querySelector("button");

searchInput.addEventListener("keyup", () => {
    searchStudents();
});

button.addEventListener("click", () => {
    console.log("CLICK");
    searchStudents();
});

let newStudentList = data;
function searchStudents() {
    newStudentList = [];
    let userInput = searchInput.value.toLowerCase();
    // Loop through data:
    for (let i = 0; i < data.length; i++) {
        if (
            data[i].name.first.toLowerCase().includes(userInput) ||
            data[i].name.last.toLowerCase().includes(userInput)
        ) {
            newStudentList.push(data[i]);
        }
    }
    showPage(newStudentList, 1);
    addPagination(newStudentList);
}

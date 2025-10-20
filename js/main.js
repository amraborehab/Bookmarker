var bookmarkName = document.getElementById("bookmarkName");
var wibsiteName = document.getElementById("wibsiteName");
var tableDetails = document.getElementById("showTableDetails");
var websiteList = JSON.parse(localStorage.getItem("bookmarks")) || [];
var editIndex = null;
const namePattern = /^[A-Za-z0-9_-\s]{4,}$/;
// const namePattern = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
const urlPattern = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
showTableDetails();

function addBookmark() {
    const nameValue = bookmarkName.value.trim();
    const urlValue = wibsiteName.value.trim();

    if (nameValue === "" || urlValue === "") {
        alert("Please fill in both fields.");
        return;
    }

    var isValid = true;

    if (!namePattern.test(nameValue)) {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        isValid = false;
    } else {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
    }

    if (!urlPattern.test(urlValue)) {
        wibsiteName.classList.add("is-invalid");
        wibsiteName.classList.remove("is-valid");
        isValid = false;
    } else {
        wibsiteName.classList.add("is-valid");
        wibsiteName.classList.remove("is-invalid");
    }

    if (!isValid) return;

    var websites = {
        name: nameValue,
        web: urlValue,
    };

    if (editIndex !== null) {
        websiteList[editIndex] = websites;
        editIndex = null;
        document.querySelector("button[onclick='addBookmark()']").innerText = "Submit";
    } else {
        websiteList.push(websites);
    }

    localStorage.setItem("bookmarks", JSON.stringify(websiteList));

    bookmarkName.value = "";
    wibsiteName.value = "";
    bookmarkName.classList.remove("is-valid", "is-invalid");
    wibsiteName.classList.remove("is-valid", "is-invalid");

    showTableDetails();
}

function showTableDetails() {
    var collectedBookmark = '';
    for (let i = 0; i < websiteList.length; i++) {
        collectedBookmark += `
      <tr>
        <td>${i + 1}</td>
        <td>${websiteList[i].name}</td>
        <td><a href="${websiteList[i].web}" target="_blank"><button class="visit"><i class="fa-solid fa-eye pe-1"></i>Visit</button></a></td>
        <td><button class="edit" onclick="editBookmark(${i})"><i class="fa-solid fa-pen pe-1"></i>Edit</button></td>
        <td><button class="delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
      </tr>`;
    }
    tableDetails.innerHTML = collectedBookmark;
}


function editBookmark(index) {
    bookmarkName.value = websiteList[index].name;
    wibsiteName.value = websiteList[index].web;
    editIndex = index;
    document.querySelector("button[onclick='addBookmark()']").innerText = "Update";
    bookmarkName.focus();
}

function deleteBookmark(index) {
    websiteList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(websiteList));
    showTableDetails();
}

function checkNameValidation() {
    const nameValue = bookmarkName.value.trim();
    if (!namePattern.test(nameValue)) {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
    } else {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
    }
}

function checkUrlValidation() {
    const urlValue = wibsiteName.value.trim();
    if (!urlPattern.test(urlValue)) {
        wibsiteName.classList.add("is-invalid");
        wibsiteName.classList.remove("is-valid");
    } else {
        wibsiteName.classList.add("is-valid");
        wibsiteName.classList.remove("is-invalid");
    }
}

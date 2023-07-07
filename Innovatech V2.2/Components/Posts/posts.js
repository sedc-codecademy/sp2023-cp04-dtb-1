const buttons = {
    loadMore: document.getElementById('loadMoreButton'),
    backToTop: document.getElementById("backToTopButton")
};

let elementsForPosts = {
    postPerPage: 6,
    currentPage: 1,
    posts: null,
    postsCount: 0,
}


const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
};

let addedPosts = [];


const loader = document.getElementById("loader");

const filterBtn = document.getElementById("post-filter-button");

const postContainer = document.getElementById("blogCard");

const form = document.getElementById("addPostForm");
const fileInput = document.getElementById('chooseFileInput');
const fileInputLabel = document.getElementById('chosenFileLabel');
const imagePreview = document.getElementById('imagePreview');


const fieldsNotFilledAlert = document.getElementById("fields-not-filled-alert");

getAllPosts(null);

function getAllPosts(filter) {
    fetch("../../Data/posts.json")
        .then(res => res.json())
        .then(data => {

            data.posts.unshift(...addedPosts);
            data.posts = data.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            if (filter != null) {

                if (filter.tag !== '') {
                    data.posts = data.posts.filter(obj => new RegExp(filter.tag, 'i').test(obj.tags));
                }

                if (filter.time !== '') {
                    data.posts = data.posts.sort((a, b) => {
                        const orderValue = new Date(a.date).getTime() - new Date(b.date).getTime();
                        if (filter.time == 'asc') {
                            return orderValue;
                        }
                        return orderValue * -1
                    });
                }

                if (filter.month !== '') {
                    let month = monthMap[filter.month] || 0;
                    data.posts = data.posts.filter(x => postMonth = new Date(x.date).getMonth() + 1 === month);
                }

                elementsForPosts.postPerPage = 6;
                elementsForPosts.currentPage = 1;
                elementsForPosts.posts = null;
                elementsForPosts.postsCount = 0;

                postContainer.innerHTML = '';
            }

            elementsForPosts.posts = data.posts;
            elementsForPosts.postsCount = elementsForPosts.posts.length;

            if (elementsForPosts.postsCount <= elementsForPosts.postPerPage) {
                displayPosts(elementsForPosts.postsCount);
                buttons.loadMore.style.display = "none";
            } else {
                displayPosts(elementsForPosts.currentPage * elementsForPosts.postPerPage);
                buttons.loadMore.style.display = "block";
            }

        }).catch(error => {
            console.log(error);
        })
}


// Function to display 6 posts per page + Load More button functionality
function displayPosts(postsToLoad) {
    let nextPagePosts;
    let startingIndex = (elementsForPosts.currentPage * elementsForPosts.postPerPage) - elementsForPosts.postPerPage;

    if (postsToLoad >= elementsForPosts.postsCount) {
        nextPagePosts = elementsForPosts.posts.slice(startingIndex, elementsForPosts.postsCount);
        buttons.loadMore.style.display = "none";
    } else {
        nextPagePosts = elementsForPosts.posts.slice(startingIndex, postsToLoad);
    }

    createCard(nextPagePosts);

    elementsForPosts.currentPage++;
};


// Function to create a card
function createCard(posts) {
    const blogCard = document.getElementById("blogCard");

    posts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.style.width = "200px";
        image.style.height = "300px";
        image.src = post.coverImage;
        image.alt = "Blog Picture";
        image.id = "image";

        const totalContent = document.createElement("div");
        totalContent.classList.add("total-content");

        const date = document.createElement("p");
        date.id = "postDate";
        date.textContent = post.date;

        const title = document.createElement("h2");
        title.id = "title";
        title.textContent = post.title;

        const text = document.createElement("p");
        text.id = "text";
        text.textContent = post.text;

        const tags = document.createElement("div");
        tags.classList.add("tags");
        tags.innerHTML = post.tags.map(tag => `<span>#${tag}</span>`).join(", ");

        const icons = document.createElement("div");
        icons.classList.add("icons");
        icons.classList.add("card-icons");

        const commentIcon = document.createElement("span");
        commentIcon.classList.add("comment-icon");
        commentIcon.textContent = "💬";
        commentIcon.addEventListener("click", () => {
            const commentForm = document.getElementById("add-comment-form");
            commentForm.style.display = "block";

            const overlay = document.getElementById("overlay");
            overlay.style.display = "block";

        })

        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.addEventListener("click", () => {
            heart.classList.toggle("liked");
        });

        icons.appendChild(commentIcon);
        icons.appendChild(heart);

        totalContent.appendChild(date);
        totalContent.appendChild(title);
        totalContent.appendChild(text);
        totalContent.appendChild(tags);
        totalContent.appendChild(icons);

        card.appendChild(image);
        card.appendChild(totalContent);

        blogCard.appendChild(card);

    });

    blogCard.appendChild(buttons.loadMore);
}


// Back to top

// Show the "Back to Top" button when scrolling down
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        buttons.backToTop.style.display = "block";
    } else {
        buttons.backToTop.style.display = "none";
    }
});

// Scroll to the top of the page when the button is clicked
buttons.backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


buttons.loadMore.addEventListener('click', () => {
    loader.style.display = "block";
    displayPosts(elementsForPosts.currentPage * elementsForPosts.postPerPage);
    loader.style.display = "none";
});


class Filter {
    constructor(month, time, tag) {
        this.month = month;
        this.time = time;
        this.tag = tag;
    }
};

filterBtn.addEventListener("click", () => {
    getAllPosts({
        month: document.getElementById("post-filter-month").value,
        time: document.getElementById("post-filter-time").value,
        tag: document.getElementById("post-filter-tag").value
    });
});





fileInput.addEventListener("change", evt => {
    const [file] = fileInput.files
    if (file) {
        fileInputLabel.textContent = fileInput.files[0].name;
        let uploadedFileExtension = fileInputLabel.textContent.split(".").slice(-1)
        if (imageExtensions.includes(uploadedFileExtension[0])) {
            imagePreview.src = URL.createObjectURL(file)
            imagePreview.style.display = "block";
        } else {
            imagePreview.style.display = "none";
        }
    }
});

//create new post
function createNewPost() {
    const titleInput = document.querySelector("#newPost input[placeholder='Enter a title']");
    const descriptionInput = document.querySelector("#newPost input[placeholder='Enter a description']");
    const tagsInput = document.querySelector("#newPost input[placeholder='Enter a tags']");
    const fileInput = document.getElementById("chooseFileInput");

    if (fileInput.value != '' && descriptionInput.value != '' && tagsInput.value != '' && fileInput.value != '') {
        addedPosts.unshift({
            title: titleInput.value,
            text: descriptionInput.value,
            tags: [tagsInput.value],
            coverImage: URL.createObjectURL(fileInput.files[0]),
            date: formatDateToExact(new Date())
        });


        elementsForPosts.postPerPage = 6;
        elementsForPosts.currentPage = 1;
        elementsForPosts.posts = null;
        elementsForPosts.postsCount = 0;

        postContainer.innerHTML = '';

        getAllPosts(null);


    } else {
        fieldsNotFilledAlert.style.display = "block";
        setTimeout(() => {
            fieldsNotFilledAlert.style.display = "none"
        }, 2000);
    }

    fileInputLabel.textContent = "Choose file"
    imagePreview.style.display = "none";
    imagePreview.src = ''
    form.reset();
}

// Add event listener to the "Create" button
const createButton = document.getElementById("createNewPostBtn");
createButton.addEventListener("click", createNewPost);

function formatDateToExact(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//cancelbtn from comment form
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", () => {
    const commentForm = document.getElementById("add-comment-form");
    commentForm.style.display = "none";


    const overlay = document.getElementById("overlay");

    commentForm.style.display = "none";
    overlay.style.display = "none";
    document.body.style.backgroundColor = "initial";
});

//addCommentBtn 
const commentsArray = [];

function addComment() {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comments");

    const name = nameInput.value;
    const comment = commentInput.value;

    if (name !== "" && comment !== "") {
        const commentData = {
            name,
            comment
        };

        commentsArray.push(commentData);

        // console.log(commentsArray);

        nameInput.value = "";
        commentInput.value = "";

        showSuccessMessage();
    }
}

function showSuccessMessage() {
    let message = document.getElementById("comment-success-alert");
    message.style.display = "block";

    setTimeout(function () {
        message.style.display = "none";
    }, 2000);

}

document.addEventListener('DOMContentLoaded', function () {
    const btnAddComment = document.getElementById("btnAddComment");
    btnAddComment.addEventListener("click", addComment);
});













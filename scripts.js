// Function to dynamically add cards to the page
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.path}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.subTitle}
                            <i class="material-icons right">close</i>
                        </span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

// Function to handle form submission
const formSubmitted = () => {
    let formData = {
        title: $('#title').val(),
        path: $('#path').val(),
        subTitle: $('#subTitle').val(),
        description: $('#description').val()
    };

    console.log('Form Data:', formData);
    postCat(formData);
};

// Function to send POST request to save a new cat
function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Cat posted successfully!');
                location.reload();
            }
        },
        error: (err) => {
            console.error('Error posting cat:', err);
            alert('Failed to post cat. Please try again.');
        }
    });
}

// Function to fetch all cats from the server
function getAllCats() {
    $.get('/api/cat', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        } else {
            console.error('Error fetching cats:', result.message);
        }
    });
}

// Initialize Socket.IO connection
let socket = io();

// Listen for 'number' event and log the message
socket.on('number', (msg) => {
    console.log('Received Random Number from server:', msg);
});

// Initialize Materialize components and event listeners when document is ready
$(document).ready(function () {
    $('.materialboxed').materialbox(); // Initialize Materialize image zoom
    $('.modal').modal(); // Initialize Materialize modal

    // Attach click event to form submit button
    $('#formSubmit').click(() => {
        formSubmitted();
    });

    // Fetch all cats on page load
    getAllCats();

    console.log('Document is ready!');
});

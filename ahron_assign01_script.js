function $(id) {
return document.getElementById(id);
}

function fetchUsers() {
const count = $("userCount").value;
const userCount = parseInt(count, 10);
const container = $("userContainer");

return new Promise((resolve, reject) => {
    if (!isNaN(userCount) && userCount >= 0 && userCount <= 1000) {
        fetch(`https://randomuser.me/api/?results=${userCount}`)
            .then(response => {
                if (!response.ok) { 
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                container.innerHTML = "";

                data.results.forEach((user, index) => {
                    const info = document.createElement("div");
                    info.className = "card p-3 shadow-sm mb-3";
                    info.style.minWidth = "1000px";

                    info.innerHTML = `
                        <div class="d-flex justify-content-between text-center">
                            <div class="flex-fill mx-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle w-100" type="button" id="dropdown${index}" data-bs-toggle="dropdown" aria-expanded="false">
                                        First Name
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdown${index}">
                                        <li><a class="dropdown-item" href="#" data-name-type="First Name" data-name="${user.name.first}">First Name: ${user.name.first}</a></li>
                                        <li><a class="dropdown-item" href="#" data-name-type="Last Name" data-name="${user.name.last}">Last Name: ${user.name.last}</a></li>
                                    </ul>
                                    <div class="name-display">${user.name.first}</div>
                                </div>
                            </div>
                            <div class="flex-fill mx-1">
                                <div class="bg-light rounded p-1">Gender</div>
                                <div>${user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</div>
                            </div>
                            <div class="flex-fill mx-1">
                                <div class="bg-light rounded p-1">Email Address</div>
                                <div>${user.email}</div>
                            </div>
                            <div class="flex-fill mx-1">
                                <div class="bg-light rounded p-1">Country</div>
                                <div>${user.location.country}</div>
                            </div>
                        </div>
                    `;
                    container.appendChild(info);

                    const dropdownItems = info.querySelectorAll(".dropdown-item");
                    const dropdownButton = info.querySelector("button");
                    const nameDisplay = info.querySelector(".name-display");

                    dropdownItems.forEach(item => {
                        item.addEventListener("click", (e) => {
                            e.preventDefault();
                            dropdownButton.textContent = item.dataset.nameType;
                            nameDisplay.textContent = item.dataset.name;
                        });
                    });
                });

                resolve(data); 
            })
            .catch(error => {
                console.error("Failed to fetch users:", error);
                container.innerHTML = `<div class="text-danger text-center mt-3">Failed to load user data. Please try again.</div>`;
                reject(error); 
            });
    } else {
        const errorMessage = "Please enter a number between 0 and 1000.";
        console.error(errorMessage);
        container.innerHTML = `<div class="text-danger text-center mt-3">${errorMessage}</div>`;
        reject(new Error(errorMessage));
    }
});
}

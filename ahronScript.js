function $(id) {
return document.getElementById(id);
}

let userRow = []
let currentEditIndex = -1

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

                userRow = data.results;
                data.results.forEach((user, index) => {
                    const row = document.createElement("div");
                    row.className = "card p-3 shadow-sm mb-3";
                    row.style.minWidth = "1000px";
                    row.setAttribute('data-user-index', index)

                    row.innerHTML = `
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
                    container.appendChild(row);
                    
                    const dropdownItems = row.querySelectorAll(".dropdown-item");
                    const dropdownButton = row.querySelector("button");
                    const nameDisplay = row.querySelector(".name-display");

                    dropdownItems.forEach(item => {
                        item.addEventListener("click", (e) => {
                            e.preventDefault();
                            dropdownButton.textContent = item.dataset.nameType;
                            nameDisplay.textContent = item.dataset.name;
                    
                        });
                    });

                    row.addEventListener("dblclick", () => {
                        editIndex = index;
                        showUserModal(user, index);

                    })
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

function showUserModal(user, index) {
    const modalUser = $("modalUser");
    
    modalUser.innerHTML = `
        <div class="text-center mb-3"> 
            <img src="${user.picture.large}" alt="${user.name.first.charAt(0)}${user.name.last.charAt(0)}" class="rounded-circle mb-2" width="120" height="120">
            <div id="userDetails">
                <p><strong>Name:</strong> <span id="userName">${user.name.title} ${user.name.first} ${user.name.last}</span></p>
                <p><strong>Address:</strong> <span id="userAddress">${user.location.street.number} ${user.location.street.name}</span></p>
                <p><strong>Email:</strong> <span id="userEmail">${user.email}</span></p>
                <p><strong>Phone Number:</strong> <span id="userPhone">${user.cell}</span></p>
                <p><strong>Telephone Number:</strong> <span id="userTelephone">${user.phone}</span></p>
                <p><strong>Date of birth:</strong> <span id="userDob">${user.dob.date.slice(0, 10)}</span></p>
                <p><strong>Gender:</strong> <span id="userGender">${user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span></p>
            </div>
            <div id="editForm" style="display: none;">
                <div class="mb-3">
                    <label class="form-label"><strong>First Name:</strong></label>
                    <input type="text" class="form-control" id="editFirstName" value="${user.name.first}">
                </div>
                <div class="mb-3">
                    <label class="form-label"><strong>Last Name:</strong></label>
                    <input type="text" class="form-control" id="editLastName" value="${user.name.last}">
                </div>
                <div class="mb-3">
                    <label class="form-label"><strong>Email:</strong></label>   
                    <input type="email" class="form-control" id="editEmail" value="${user.email}">
                </div>
                <div class="mb-3">
                    <label class="form-label"><strong>Phone:</strong></label>
                    <input type="text" class="form-control" id="editPhone" value="${user.cell}">
                </div>
                <div class="mb-3">
                    <label class="form-label"><strong>Gender:</strong></label>
                    <select class="form-control" id="editGender">
                        <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                        <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                    </select>
                </div>
            </div>  
            <div class="mt-3">
                <button type="button" class="btn btn-info me-2" id="modifyBtn" onclick="toggleEditMode()">Modify</button>
                <button type="button" class="btn btn-success me-2" id="saveBtn" style="display: none;" onclick="saveUserChanges()">Save</button>
                <button type="button" class="btn btn-secondary me-2" id="cancelBtn" style="display: none;" onclick="cancelEdit()">Cancel</button>
                <button type="button" class="btn btn-danger" onclick="deleteUser(${index})">Delete</button>
            </div>
        </div>
    `;

    const userInfoModal = new bootstrap.Modal($("userInfoModal"));
    userInfoModal.show();
}

function toggleEditMode() {
    const userDetails = $("userDetails");
    const editForm = $("editForm");
    const modifyBtn = $("modifyBtn");
    const saveBtn = $("saveBtn");
    const cancelBtn = $("cancelBtn");
    
    userDetails.style.display = "none";
    editForm.style.display = "block";
    modifyBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
}

function cancelEdit() {
    const userDetails = $("userDetails");
    const editForm = $("editForm");
    const modifyBtn = $("modifyBtn");
    const saveBtn = $("saveBtn");
    const cancelBtn = $("cancelBtn");
    
    userDetails.style.display = "block";
    editForm.style.display = "none";
    modifyBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
}

function saveUserChanges() {
    if (editIndex === -1) return;
    
    const user = userRow[editIndex];
    

    user.name.first = $("editFirstName").value;
    user.name.last = $("editLastName").value;
    user.email = $("editEmail").value;
    user.cell = $("editPhone").value;
    user.gender = $("editGender").value;
    
    $("userName").textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
    $("userEmail").textContent = user.email;
    $("userPhone").textContent = user.cell;
    $("userGender").textContent = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
    
    updateUserRowDisplay(editIndex);
    
    cancelEdit();
}

function updateUserRowDisplay(index) {
    const userRows = document.querySelectorAll('[data-user-index]');
    const targetRow = Array.from(userRows).find(row => row.getAttribute('data-user-index') == index);
    
    if (targetRow) {
        const user = userRow[index];
        const nameDisplay = targetRow.querySelector('.name-display');
        const emailDiv = targetRow.querySelector('.flex-fill:nth-child(3) div:nth-child(2)');
        const genderDiv = targetRow.querySelector('.flex-fill:nth-child(2) div:nth-child(2)');
        
        if (nameDisplay) nameDisplay.textContent = user.name.first;
        if (emailDiv) emailDiv.textContent = user.email;
        if (genderDiv) genderDiv.textContent = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
        
        const dropdownItems = targetRow.querySelectorAll('.dropdown-item');
        if (dropdownItems[0]) {
            dropdownItems[0].textContent = `First Name: ${user.name.first}`;
            dropdownItems[0].setAttribute('data-name', user.name.first);
        }
        if (dropdownItems[1]) {
            dropdownItems[1].textContent = `Last Name: ${user.name.last}`;
            dropdownItems[1].setAttribute('data-name', user.name.last);
        }
    }
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        userRow.splice(index, 1);
        
        const container = $("userContainer");
        const userRows = container.querySelectorAll('[data-user-index]');
        
        const targetRow = Array.from(userRows).find(row => row.getAttribute('data-user-index') == index);
        if (targetRow) {
            targetRow.remove();
        }
        
        
        const remainingRows = container.querySelectorAll('[data-user-index]');
        remainingRows.forEach((row) => {
            const currentIndex = parseInt(row.getAttribute('data-user-index'));
            if (currentIndex > index) {
                const newIndex = currentIndex - 1;
                row.setAttribute('data-user-index', newIndex);
                
                const dropdown = row.querySelector('[id^="dropdown"]');
                if (dropdown) {
                    dropdown.id = `dropdown${newIndex}`;
                }
            }
        });
        
        const modal = bootstrap.Modal.getInstance($("userInfoModal"));
        if (modal) modal.hide();
    }
}

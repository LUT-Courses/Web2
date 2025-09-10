if(document.readyState !== "loading") {
    initializeCode();    
} else {
    document.addEventListener("DOMContentLoaded", function() {
        initializeCode();
    })
}

function initializeCode() {

    
    const form = document.getElementById("myForm")
    const emptyTable = document.getElementById("empty-table");
    const tableBody = document.getElementById("table").querySelector("tbody");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const newUsername = document.getElementById("input-username").value
        const newEmail = document.getElementById("input-email").value
        const newAdmin = document.getElementById("input-admin").checked ? "X" : "-"
        const newImage = document.getElementById("input-image")
        const file = newImage.files[0]

        let isNew = 1;
        let foundRow;
        for (const row of tableBody.rows) {
            const username = row.cells[0].textContent

            if(username == newUsername) {
                isNew = 0
                foundRow = row
                break;
            } 
        }

        if (isNew == 1) {
            const newRow = tableBody.insertRow();

            newRow.insertCell().textContent = newUsername
            newRow.insertCell().textContent = newEmail
            newRow.insertCell().textContent = newAdmin
            const imgCell = newRow.insertCell();
            if (file) {
                const img = document.createElement("img");
                img.style.width = "64px";
                img.style.height = "64px";
                img.src = URL.createObjectURL(file);
                imgCell.appendChild(img);
            } else {
                imgCell.textContent = "-"
            }
        } else {
            foundRow.cells[1].textContent = newEmail
            foundRow.cells[2].textContent = newAdmin
            const imgCell = foundRow.cells[3]
            imgCell.innerHTML = "";
            if (file) {
                const img = document.createElement("img");
                img.style.width = "64px";
                img.style.height = "64px";
                img.src = URL.createObjectURL(file);
                imgCell.appendChild(img);
            } else {
                imgCell.textContent = "-"
            }
        }
          
    })

    emptyTable.addEventListener("click", function() {
        tableBody.innerHTML = "";
    })

}
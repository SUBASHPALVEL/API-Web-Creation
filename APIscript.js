document.addEventListener("DOMContentLoaded", function () {
  const loadingGif = document.getElementById("loadingGif");
  loadingGif.style.display = "block";

  const studentsData = localStorage.getItem("students");
  if (studentsData) {
    students = JSON.parse(studentsData);
    displayStudents(students);

    loadingGif.style.display = "none";
  } else {
    fetch("https://my-json-server.typicode.com/SUBASHPALVEL/SampleDB/students")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("students", JSON.stringify(data));
        displayStudents(data);
        loadingGif.style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        loadingGif.style.display = "none";
      });
  }
});

// Display students in the table
function displayStudents(students) {
  const tableBody = document.querySelector("#student-table tbody");
  tableBody.innerHTML = "";

  if (students.length == 0) {
    document.querySelector(".no-Data").style.display = "block";
    localStorage.removeItem("students");
  } else {
    document.querySelector(".no-Data").style.display = "none";
    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td><span class="edit-btn" data-id="${student.name}">Edit</span></td>
            <td><span class="delete-btn" data-id="${student.name}">Delete</span></td>
        `;
      tableBody.appendChild(row);
    });
  }

  const totalEntries = document.getElementById("totalEntries");
  totalEntries.textContent = `Total Entries: ${students.length}`;
}

// Attach event listener to "Edit" button and "Delete" button
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    handleEdit(event);
  } else if (event.target.classList.contains("delete-btn")) {
    handleDelete(event);
  }
});

// Handle edit button click
function handleEdit(event) {
  const studentId = event.target.getAttribute("data-id");
  const students = JSON.parse(localStorage.getItem("students"));

  // Find the student by ID
  const studentIndex = students.findIndex((s) => s.name === studentId);
  if (studentIndex !== -1) {
    const student = students[studentIndex];

    // Display an edit form
    const editForm = `
            <td><input type="text" id="edit-name" value="${student.name}" /></td>
            <td><input type="number" id="edit-age" value="${student.age}" /></td>
            <td><input type="text" id="edit-grade" value="${student.grade}" /></td>
            <td>
                <button class="save-btn" data-index="${studentIndex}">Save</button>
                <button class="cancel-btn">Cancel</button>
            </td>
        `;

    const row = event.target.parentNode.parentNode;
    row.innerHTML = editForm;

    const saveButton = row.querySelector(".save-btn");
    const cancelButton = row.querySelector(".cancel-btn");

    saveButton.addEventListener("click", () => {
      const updatedStudent = {
        id: student.id,
        name: document.querySelector("#edit-name").value,
        age: parseInt(document.querySelector("#edit-age").value),
        grade: document.querySelector("#edit-grade").value,
      };

      students[studentIndex] = updatedStudent;
      localStorage.setItem("students", JSON.stringify(students));

      displayStudents(students);
    });

    cancelButton.addEventListener("click", () => {
      displayStudents(students);
    });
  }
}

// Handle delete button click
function handleDelete(event) {
  const studentId = event.target.getAttribute("data-id");
  let students = JSON.parse(localStorage.getItem("students"));

  // Find the student by ID
  const studentIndex = students.findIndex(
    (student) => student.name === studentId
  );

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents(students);
  }
}

// Handle clearList button click
function handleClearList() {
  let students = JSON.parse(localStorage.getItem("students"));
  students.splice(0, students.length);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents(students);
  localStorage.removeItem("students");
}

// Handle AppendData button click
function handleAppendData() {
  // Start the rotation animation
  const refreshIcon = document.getElementById("refreshIcon");
  refreshIcon.style.display = "block";
  refreshIcon.style.animation = "spin 2s linear infinite"; // Adjust the duration and timing function as needed

  fetch("https://my-json-server.typicode.com/SUBASHPALVEL/SampleDB/students")
    .then((response) => response.json())
    .then((newData) => {
      let students = JSON.parse(localStorage.getItem("students")) || [];
      students = students.concat(newData);
      localStorage.setItem("students", JSON.stringify(students));
      displayStudents(students);

      // Stop the rotation animation once data is appended
      refreshIcon.style.animation = "none";
      refreshIcon.style.display = "none";
    })
    .catch((error) => {
      console.error("Error appending data:", error);
      // Stop the rotation animation on error as well
      refreshIcon.style.animation = "none";
      refreshIcon.style.display = "none";
    });
}

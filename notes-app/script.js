const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(noteText = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
      <div class="notes">
        <div class="tools">
          <button class="edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="main ${noteText ? "" : "hidden"}"></div>
        <textarea class="${noteText ? "hidden" : ""}"></textarea>
      </div>
  
  `;

  const notesEl = note.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const mainEl = notesEl.querySelector(".main");
  const textArea = notesEl.querySelector("textarea");

  textArea.value = noteText;
  mainEl.innerHTML = marked(noteText);

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = marked(value);

    updateLS();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  document.body.appendChild(note);
}

/*
; */

function updateLS() {
  const noteText = document.querySelectorAll("textarea");
  const notes = [];

  noteText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

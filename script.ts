class Student {
    name: string;
    rollNo: number;
    marks: number[];

    constructor(name: string, rollNo: number, marks: number[]) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }

    calculateTotal(): number {
        return this.marks.reduce((total, mark) => total + mark, 0);
    }

    calculateAverage(): number {
        return this.calculateTotal() / this.marks.length;
    }

    calculateGrade(): string {
        const average = this.calculateAverage();
        if (average >= 90) return "A+";
        else if (average >= 80) return "A";
        else if (average >= 70) return "B";
        else if (average >= 60) return "C";
        else return "D";
    }
}

const students: Student[] = [];

const addStudent = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const rollNo = Number((form.elements.namedItem("rollNo") as HTMLInputElement).value);
    const marks = [];
    for (let i = 1; i <= 5; i++) {
        marks.push(Number((form.elements.namedItem(`subject${i}`) as HTMLInputElement).value));
    }
    students.push(new Student(name, rollNo, marks));
    displayStudents();
    form.reset();
};

const deleteStudent = (rollNoToDelete: number) => {
    const index = students.findIndex(student => student.rollNo === rollNoToDelete);
    if (index !== -1) {
        students.splice(index, 1);
        displayStudents();
    } else {
        alert("Student not found!");
    }
};

const editStudent = (rollNo: number) => {
    const student = students.find(student => student.rollNo === rollNo);
    if (student) {
        const newName = prompt("Enter new name:")!;
        student.name = newName;
        const newMarks = [];
        for (let i = 1; i <= 5; i++) {
            newMarks.push(Number(prompt(`Enter new marks for subject ${i}:`)!));
        }
        student.marks = newMarks;
        displayStudents();
    } else {
        alert("Student not found!");
    }
};

const displayStudents = () => {
    const tableBody = document.querySelector("#students-table tbody")! as HTMLTableElement;
    tableBody.innerHTML = "";
    students.forEach((student) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.rollNo.toString();
        student.marks.forEach((mark) => {
            row.insertCell().textContent = mark.toString();
        });
        const totalCell = row.insertCell();
        totalCell.textContent = student.calculateTotal().toString();
        const averageCell = row.insertCell();
        averageCell.textContent = student.calculateAverage().toFixed(2);
        row.insertCell().textContent = student.calculateGrade();
        const actionsCell = row.insertCell();
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editStudent(student.rollNo));
        actionsCell.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteStudent(student.rollNo));
        actionsCell.appendChild(deleteButton);
    });
    displayAverage();
};

const displayAverage = () => {
    const averageDisplay = document.getElementById("average-display")!;
    const totalMarks = students.reduce((total, student) => total + student.calculateAverage(), 0);
    const average = totalMarks / students.length;
    averageDisplay.innerHTML = `<h3 class="class-avg">Total Students: ${students.length}, Average Total Marks: ${average ? average.toFixed(2): 0}</h3>`;
    // STYLES //
    averageDisplay.style.textAlign = "center";
};

document.getElementById("add-student-form")!.addEventListener("submit", addStudent);

displayStudents();
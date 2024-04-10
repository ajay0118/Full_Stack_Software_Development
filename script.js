var Student = /** @class */ (function () {
    function Student(name, rollNo, marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }
    Student.prototype.calculateTotal = function () {
        return this.marks.reduce(function (total, mark) { return total + mark; }, 0);
    };
    Student.prototype.calculateAverage = function () {
        return this.calculateTotal() / this.marks.length;
    };
    Student.prototype.calculateGrade = function () {
        var average = this.calculateAverage();
        if (average >= 90)
            return "A+";
        else if (average >= 80)
            return "A";
        else if (average >= 70)
            return "B";
        else if (average >= 60)
            return "C";
        else
            return "D";
    };
    return Student;
}());
var students = [];
var addStudent = function (event) {
    event.preventDefault();
    var form = event.target;
    var name = form.elements.namedItem("name").value;
    var rollNo = Number(form.elements.namedItem("rollNo").value);
    var marks = [];
    for (var i = 1; i <= 5; i++) {
        marks.push(Number(form.elements.namedItem("subject".concat(i)).value));
    }
    students.push(new Student(name, rollNo, marks));
    displayStudents();
    form.reset();
};
var deleteStudent = function (rollNoToDelete) {
    var index = students.findIndex(function (student) { return student.rollNo === rollNoToDelete; });
    if (index !== -1) {
        students.splice(index, 1);
        displayStudents();
    }
    else {
        alert("Student not found!");
    }
};
var editStudent = function (rollNo) {
    var student = students.find(function (student) { return student.rollNo === rollNo; });
    if (student) {
        var newName = prompt("Enter new name:");
        student.name = newName;
        var newMarks = [];
        for (var i = 1; i <= 5; i++) {
            newMarks.push(Number(prompt("Enter new marks for subject ".concat(i, ":"))));
        }
        student.marks = newMarks;
        displayStudents();
    }
    else {
        alert("Student not found!");
    }
};
var displayStudents = function () {
    var tableBody = document.querySelector("#students-table tbody");
    tableBody.innerHTML = "";
    students.forEach(function (student) {
        var row = tableBody.insertRow();
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.rollNo.toString();
        student.marks.forEach(function (mark) {
            row.insertCell().textContent = mark.toString();
        });
        var totalCell = row.insertCell();
        totalCell.textContent = student.calculateTotal().toString();
        var averageCell = row.insertCell();
        averageCell.textContent = student.calculateAverage().toFixed(2);
        row.insertCell().textContent = student.calculateGrade();
        var actionsCell = row.insertCell();
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () { return editStudent(student.rollNo); });
        actionsCell.appendChild(editButton);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () { return deleteStudent(student.rollNo); });
        actionsCell.appendChild(deleteButton);
    });
    displayAverage();
};
var displayAverage = function () {
    var averageDisplay = document.getElementById("average-display");
    var totalMarks = students.reduce(function (total, student) { return total + student.calculateAverage(); }, 0);
    var average = totalMarks / students.length;
    averageDisplay.innerHTML = "<h3 class=\"class-avg\">Total Students: ".concat(students.length, ", Average Total Marks: ").concat(average ? average.toFixed(2) : 0, "</h3>");
    // STYLES //
    averageDisplay.style.textAlign = "center";
};
document.getElementById("add-student-form").addEventListener("submit", addStudent);
displayStudents();

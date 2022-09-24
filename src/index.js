const API = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io";

const addForm = document.getElementById("addStudentForm");

const controller = async (path, method = "GET", body) => {
    let URL = `${API}/${path}`;
    
    const params = {
        method,
        headers: {
            "content-type": "application/json",
        }
    }

    if (body) params.body = JSON.stringify(body);

    let request = await fetch(URL, params);

    if (request.ok) {
        let responce = await request.json();
        return responce; 
    } else {
        alert(`Error ${request.status}! ${request.statusText}`);
    }
} 

async function studentsList() {
    const studentsArr = await controller("students");

    studentsArr.map(student => {
        const studenInfo = new Student(student);
        studenInfo.render(); 
    })
}

addForm.addEventListener("submit", async e => {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();

    const body = {
        name: studentName,
    }

    if (studentName !== "") {
        const addStudent = await controller("students", "POST", body);

        if (addStudent) {
            const newStudent = new Student(addStudent);
            newStudent.render();
            addForm.reset();
        }
    } else {
        alert("Please, enter student name!");
    }
})

class Student {
    constructor(studentObj){
        for(let key in studentObj) {
            this[key] = studentObj[key];
        }  
    }

    render() {
        const tBody = document.getElementById("tbody");
       
        const trList = `
            <tr class="students__table-rows" id="${this.id}">
                <td class="student__name">
                    ${this.name}
                    <button class="button delete-btn" id="delete-${this.id}">Delete</button>
                </td>
                ${this.renderRating()}
            </tr>
        `;

        tBody.insertAdjacentHTML("afterbegin", trList);

        this.deleteStudent();
        this.changeMark();
    }

    renderRating() {
        return this.marks.map((mark, i) => {
            return `
                <td>
                    <input class="students__marks" type="text" value="${mark}" id="${this.name}_${i}">
                </td>
            `; 
        })
        .join("");
    } 
    
    deleteStudent() {
        const deleteBtn = document.getElementById(`delete-${this.id}`);

        deleteBtn.addEventListener("click", async () => {
            
            const studentInfo = document.getElementById(`${this.id}`);

            const deleteStudent = await controller(`students/${this.id}`, "DELETE");

            if (deleteStudent.id) {
                studentInfo.remove();
            }
        }) 
    }

    changeMark() {
        this.marks.map((mark, i, arr) => {
            const inputChange = document.getElementById(`${this.name}_${i}`);     

            inputChange.addEventListener("change", async () => {

                arr[i] = parseInt(inputChange.value); 

                const body = {
                    marks: arr,
                };

                await controller(`students/${this.id}`, "PUT", body);
            })
        })
    }
}

studentsList();
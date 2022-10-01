const API="https://5dd3d5ba8b5e080014dc4bfa.mockapi.io",addForm=document.getElementById("addStudentForm"),loader=document.getElementById("loader"),controller=async(t,e="GET",s)=>{t=API+"/"+t;const n={method:e,headers:{"content-type":"application/json"}};s&&(n.body=JSON.stringify(s));let d=await fetch(t,n);if(loader.classList.add("visible"),d.ok)return loader.classList.remove("visible"),await d.json();alert(`Error ${d.status}! `+d.statusText)};async function studentsList(){const t=await controller("students");t.map(t=>{const e=new Student(t);e.render()})}addForm.addEventListener("submit",async t=>{t.preventDefault(),loader.classList.add("visible");var t=document.getElementById("studentName").value.trim(),e={name:t};if(""!==t){t=await controller("students","POST",e);if(t){const s=new Student(t);s.render(),addForm.reset()}}else loader.classList.remove("visible"),alert("Please, enter student name!")});class Student{constructor(t){for(var e in t)this[e]=t[e]}render(){const t=document.getElementById("tbody");var e=`
            <tr class="students__table-rows" id="${this.id}">
                <td class="student__name">
                    ${this.name}
                    <button class="button delete-btn" id="delete-${this.id}">Delete</button>
                </td>
                ${this.renderRating()}
            </tr>
        `;t.insertAdjacentHTML("afterbegin",e),this.deleteStudent(),this.changeMark()}renderRating(){return this.marks.map((t,e)=>`
                <td>
                    <input class="students__marks" type="text" value="${t}" id="${this.name}_${e}">
                </td>
            `).join("")}deleteStudent(){const t=document.getElementById("delete-"+this.id);t.addEventListener("click",async()=>{loader.classList.add("visible");const t=document.getElementById(""+this.id);(await controller("students/"+this.id,"DELETE")).id&&t.remove()})}changeMark(){this.marks.map((t,e,s)=>{const n=document.getElementById(this.name+"_"+e);n.addEventListener("change",async()=>{s[e]=parseInt(n.value);var t={marks:s};await controller("students/"+this.id,"PUT",t)})})}}studentsList();
//# sourceMappingURL=index.js.map

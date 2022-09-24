const API="https://5dd3d5ba8b5e080014dc4bfa.mockapi.io",addForm=document.getElementById("addStudentForm"),controller=async(t,e="GET",n)=>{t=API+"/"+t;const s={method:e,headers:{"content-type":"application/json"}};n&&(s.body=JSON.stringify(n));let d=await fetch(t,s);if(d.ok)return await d.json();alert(`Error ${d.status}! `+d.statusText)};async function studentsList(){const t=await controller("students");t.map(t=>{const e=new Student(t);e.render()})}addForm.addEventListener("submit",async t=>{t.preventDefault();var t=document.getElementById("studentName").value.trim(),e={name:t};if(""!==t){t=await controller("students","POST",e);if(t){const n=new Student(t);n.render(),addForm.reset()}}else alert("Please, enter student name!")});class Student{constructor(t){for(var e in t)this[e]=t[e]}render(){const t=document.getElementById("tbody");var e=`
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
            `).join("")}deleteStudent(){const t=document.getElementById("delete-"+this.id);t.addEventListener("click",async()=>{const t=document.getElementById(""+this.id);(await controller("students/"+this.id,"DELETE")).id&&t.remove()})}changeMark(){this.marks.map((t,e,n)=>{const s=document.getElementById(this.name+"_"+e);s.addEventListener("change",async()=>{n[e]=parseInt(s.value);var t={marks:n};await controller("students/"+this.id,"PUT",t)})})}}studentsList();
//# sourceMappingURL=index.js.map

const form=document.querySelector("#taskForm"),input=document.querySelector("#taskInput"),list=document.querySelector("#taskList");
const empty=document.querySelector("#emptyState"),emptyTitle=document.querySelector("#emptyTitle"),emptyText=document.querySelector("#emptyText");
const total=document.querySelector("#totalCount"),active=document.querySelector("#activeCount"),done=document.querySelector("#doneCount"),remaining=document.querySelector("#remainingText");
const allBadge=document.querySelector("#allBadge"),activeBadge=document.querySelector("#activeBadge"),doneBadge=document.querySelector("#doneBadge");
const clear=document.querySelector("#clearCompleted");let tasks=[],filter="all";
document.querySelector("#today").textContent=new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"}).format(new Date());

function render(){
 const completed=tasks.filter(t=>t.completed).length, act=tasks.length-completed;
 const visible=tasks.filter(t=>filter==="all"||(filter==="active"&&!t.completed)||(filter==="completed"&&t.completed));
 list.innerHTML="";
 visible.forEach((t,i)=>{
  const li=document.createElement("li");li.className="task"+(t.completed?" completed":"");li.dataset.id=t.id;li.style.animationDelay=(i*35)+"ms";
  const check=document.createElement("button");check.className="check";check.innerHTML="✓";check.setAttribute("aria-label",t.completed?"Mark active":"Mark completed");
  const text=document.createElement("span");text.className="task-text";text.textContent=t.text;
  const del=document.createElement("button");del.className="delete";del.innerHTML="×";del.setAttribute("aria-label","Delete task");
  li.append(check,text,del);list.appendChild(li);
 });
 total.textContent=tasks.length;active.textContent=act;done.textContent=completed;
 allBadge.textContent=tasks.length;activeBadge.textContent=act;doneBadge.textContent=completed;
 remaining.textContent=`${act} task${act===1?"":"s"} remaining`;
 empty.hidden=visible.length!==0;
 if(!visible.length){const m={all:["Your workspace is clear","Add a task above and start making progress."],active:["No active tasks","Everything is completed for now."],completed:["Nothing completed yet","Complete a task and it will appear here."]}[filter];emptyTitle.textContent=m[0];emptyText.textContent=m[1]}
}
form.addEventListener("submit",e=>{e.preventDefault();const text=input.value.trim();if(!text)return;tasks.unshift({id:crypto.randomUUID(),text,completed:false});input.value="";input.focus();render()});
list.addEventListener("click",e=>{const li=e.target.closest(".task");if(!li)return;const id=li.dataset.id;if(e.target.closest(".check")){const t=tasks.find(x=>x.id===id);t.completed=!t.completed}if(e.target.closest(".delete"))tasks=tasks.filter(x=>x.id!==id);render()});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render()}));
clear.addEventListener("click",()=>{tasks=tasks.filter(t=>!t.completed);render()});render();

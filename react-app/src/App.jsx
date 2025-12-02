import {useEffect, useState} from 'react'
const getSavedData = () => {
    try {
      const savedData=localStorage.getItem('notes')
      if(savedData){
        return JSON.parse(savedData)}
      } catch (error) {
      alert("Error reading local storage",error)}
    return [] }
const App = () => {
  const[title,setTitle]=useState('')
  const[content,setContent]=useState('')
  const[task,setTask]=useState(getSavedData)
  const [editIndex, setEditIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  let def
  def='You do not have any notes'
  useEffect (
    function(){
      try {
        localStorage.setItem('notes',JSON.stringify(task))
      } catch (error) {
        console.error("Error writing local storage",error)
      }
    },[task])
    const submitHandler=(e)=>
    {
      e.preventDefault()
      const copyTask=[...task]
      if(content !='') {
        if (isEditing && editIndex !== -1) {
        copyTask[editIndex] = { title, content };
        setTask(copyTask);
        setIsEditing(false);
        setEditIndex(-1);
        } else {
           copyTask.push({title,content})
           setTask(copyTask)}}
        console.log(task)
        setTitle('')
        setContent('')
     } 
    function deleteNode(idx)
    {      
       const copyTask=[...task]
       copyTask.splice(idx,1)
       setTask(copyTask)
       if (idx === editIndex) {
        setIsEditing(false);
        setEditIndex(-1);
        setTitle('');
        setContent('');
       }
    }
     function editNote(idx) {
      const noteToEdit = task[idx];
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setIsEditing(true);
      setEditIndex(idx);
      //window.scrollTo(0, 0);
    }
     
  return (
    <div className="lg:flex h-screen w-screen">
    <div className='bg-black h-screen overflow-auto lg:w-1/2 text-amber-50 '>
        <div className='text-white w-full sticky top-0 z-10 bg-blue-900 p-5 mb-8 justify-center flex text-4xl'>
        {isEditing ? 'Edit your note here' : 'Write your notes here'}
         </div>
         <form className='flex flex-col justify-center items-center' 
          onSubmit={(e)=>{
          submitHandler(e)}}>
          <input type='text' placeholder='Enter the title of your note' className='focus:outline-none border-amber-50 border-2 bg-gray-950 p-5 w-2/3 m-5 text-2xl'
          value={title}
          onChange={(e)=>          
            setTitle(e.target.value)
          }/>
          <textarea placeholder='Enter the title of your note' className='focus:outline-none border-amber-50 border-2 bg-gray-950 m-5 p-5 w-2/3 h-90 text-2xl' id='ip'
          value={content}
          onChange={(e)=>
           setContent(e.target.value)
          }>
          </textarea>
        <button className='text-white bg-blue-700 pt-2 pb-2 rounded w-2/3 text-2xl mt-4 mb-7 hover:cursor-pointer hover:scale-95'id='ip'>
          {isEditing ? 'Update the note' : 'Save the note'}
        </button>
        </form>
    </div>
    <div className='bg-black h-screen lg:w-1/2 lg:border-l-2 border-amber-50 overflow-auto'>
      <div className='text-white sticky top-0 z-10 bg-blue-900 w-full p-5 justify-center flex text-4xl'>
       Watch your notes here</div>
       <div className='flex flex-col'>
        {
        (task.length===0)?
          (<div>
            <center>
            <div className='mt-30 h-[300px] w-[300px] bg-cover bg-center bg-[url("https://png.pngtree.com/png-clipart/20250205/original/pngtree-summary-icon-business-concept-flat-design-sign-busy-finance-vector-png-image_9986913.png")]'></div>
            <div className='text-xl text-center text-amber-50'>{def}</div>          
            </center>
            </div>
          )
        :
        (task.map(function(elem,idx) {
        return (
        <div key={idx} className={`h-5xl w-full border-b-2 border-amber-50 p-5 ${isEditing && editIndex === idx ? 'bg-blue-700' : 'bg-gray-800'}`}>
           <div className='flex gap-3 mb-3'>
           <div className='bg-amber-500 rounded-full h-9 w-9 font-bold flex items-center justify-center text-2xl shrink-0 '>{idx+1}</div>
           <h3 className='font-bold text-2xl underline'>{elem.title}</h3>
           </div>
           <p className='text-xl ml-8'>{elem.content}</p>
           <center className='flex justify-center gap-4'> 
           <button className='pt-1 pb-1 pr-2 pl-2 bg-yellow-600 rounded text-s mt-5 hover:cursor-pointer hover:scale-95'
           onClick={()=>
            editNote(idx)
           }>
            Edit</button>           
           <button className='pt-1 pb-1 pr-2 pl-2 bg-red-600 rounded text-s mt-5 hover:cursor-pointer hover:scale-95'
           onClick={()=>
            deleteNode(idx)
           }>
            Delete</button>
            </center>
       </div>);
        }        
      ))
    }
      </div>
     </div>
     </div>
  )
}
export default App
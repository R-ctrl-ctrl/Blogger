import React,{useState,useEffect} from 'react'
import  styles from '../styles/Createblog.module.css'
import {storage , db} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import {collection,addDoc} from 'firebase/firestore'

const createblog = ({user}) => {
    const [title,settitle] = useState("")
    const [body,setbody] = useState("")
    const [image,setimage] = useState(null)

    
    const handleSubmit = async ()=>{
      if(!title || !body || !image) return;
      const imgname = image.name + v4()
      const imageref = ref(storage,`images/${imgname}`)
      
      try{
        await uploadBytes(imageref,image)

       const link =  await getDownloadURL(imageref)

        const docRef = await addDoc(collection(db, "data"), {
          title,
          body,
          created_by:user.uid,
          link,
          randnum:Math.floor(Math.random()*100000)
        });
        alert("Data uplodaded")
       }

        
      catch(err){
        console.log(err)
      }
    }

    return (
    <div className={styles.main}>
      <div className={styles.sub}>
         <p className={styles.heading}>Create A blog !</p>
         <input className={styles.inp} onChange={(e)=>settitle(e.target.value)} type="text" placeholder='Enter text' />
         <textarea className={styles.textarea} onChange={(e)=>setbody(e.target.value)} placeholder='Enter blog body'></textarea>
          <div className={styles.uploadcomp}>
            <input className={styles.filebtn} type="file" placeholder='File' onChange={(e)=>setimage(e.target.files[0])}/>
          </div>
          <button onClick={handleSubmit}>Submit</button>
          </div>
    </div>
  )
}

export default createblog

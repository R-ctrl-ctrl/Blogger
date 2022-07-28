import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import styles from '../../styles/Pid.module.css'


const pid =  ({ blogs, user }) => {
    const [comment, setcomment] = useState("")
    const [allcomments,setallcomments]  = useState([])
    useEffect( ()=>{
            loadcomments()
    },[comment])


    
    const handleclick = async () => {
        try {
            const docRef = await addDoc(collection(db, "comments"), {
                comment,
                commenter: user.displayName,
                doc_id: blogs.id
            });
            setcomment("")
            alert("Data Uploaded")
        } catch (err) {
            console.log(err)
        }
    }

    const loadcomments = async () => {
        const q = query(collection(db, "comments"), where("doc_id", "==", blogs.id))
        const querysnapshot = await getDocs(q)
        setallcomments(querysnapshot.docs.map(docsnap => {
            return {
                ...docsnap.data()
            }
        })) 
       
    }

    







    return (
        <div className={styles.main}>
            <img className={styles.blogimg} src={blogs.link} alt="" />
            <p className={styles.heading}>{blogs.title}</p>
            <p className={styles.content}>{blogs.body}</p>

            <input className={styles.commentinp} type="text" placeholder='add a comment' value={comment} onChange={(e) => setcomment(e.target.value)} />
            <button onClick={handleclick} className={styles.clickme}>Add Comment</button>

            {/* <button className={styles.loadbtn} onClick={loadcomments}>Load comments</button> */}


            <div className={styles.commentsection}>
            {
                allcomments.map((val,key)=>{
                    return (
                        <div key={key} className={styles.comment}>
                            <div className={styles.first}> {val.commenter} </div>
                           <div className={styles.second}> {val.comment} </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const { pid } = context.params

    const docref = doc(db, "data", pid)
    const docsnap = await getDoc(docref)



    return {
        props: {
            blogs: {
                ...docsnap.data(),
                id: docsnap.id,
            }
        }, // will be passed to the page component as props
    }
}

export default pid


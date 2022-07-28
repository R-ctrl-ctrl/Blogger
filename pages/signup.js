import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import {auth} from '../firebase.js'
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth"
import {useRouter} from 'next/router'

const Signup =  () => {
    const [email,setemail] = useState("")
    const [name,setname] = useState("")
    const [password,setpassword] = useState("")
    const router = useRouter()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          
          const res = await createUserWithEmailAndPassword(auth,email,password)
          const user = auth.currentUser
          await updateProfile(user,{displayName:name})
          console.log(user.displayName)
          router.push("/")
        }catch(err){
          console.log(err)
        }
        


    }

  return (
    <div className={styles.main} onSubmit={handleSubmit}>
        <form className={styles.box}>
            <input className={styles.inp} onChange={(e)=>{setname(e.target.value)}} placeholder='Enter name'/>
            <input className={styles.inp} onChange={(e)=>{setemail(e.target.value)}} placeholder='Enter email'/>
            <input className={styles.inp} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Enter password'/>
            <button className={styles.btn} >Signup</button>
            <Link href='/login'><p className={styles.para}>Already have an account? Login</p></Link>
        </form>
        
    </div>
  )
}

export default Signup

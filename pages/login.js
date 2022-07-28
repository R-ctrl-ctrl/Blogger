import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import {auth} from '../firebase'
import {signInWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth'
import {useRouter} from 'next/router'

const login = () => {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const router = useRouter()

    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user.displayName)
      }
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await signInWithEmailAndPassword(auth,email,password)
            router.push("/")
          }catch(err){
          console.log(err)
        }
    }

  return (
    <div className={styles.main} onSubmit={handleSubmit}>
        <form className={styles.box}>
            <input className={styles.inp} onChange={(e)=>{setemail(e.target.value)}} placeholder='Enter email'/>
            <input className={styles.inp} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Enter password'/>
            <button className={styles.btn} > Login</button>
            <Link href='/signup'><p className={styles.para}>Dont have an account? signup</p></Link>
        </form>
        
    </div>
  )
}

export default login

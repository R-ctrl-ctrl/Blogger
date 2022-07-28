import React from 'react'
import styles from '../styles/Navbar.module.css'
import  {auth} from '../firebase'
import Link from 'next/link'

const Navbar = ({user}) => {
  return (
    <div className={styles.col}>
        <div className={styles.first}>
           <div className={styles.name}>Blogger</div> 
        </div>
        <div className={styles.second}>
            <ul>
                <li>Home</li>
                <li><Link href='/about'>About</Link> </li>
                <li>Contact</li>
                {
                  user 
                  ?
                  <>
                    <li><Link href='/createblog'>Create Blog</Link></li>
                    <li><button onClick={()=>auth.signOut()}>Signout</button></li>
                    <li>{user.displayName}</li>
                  </>
                  :
                  <>
                    <li><Link href='/signup'>SignUp</Link></li>
                    <li><Link href='/login'>Login</Link></li>
                  </>
                }
            </ul>
        </div>
    </div>
  )
}

export default Navbar

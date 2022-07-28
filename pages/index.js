import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from '../firebase'
import Link from 'next/link';
import { useState } from 'react';



export default function Home({ allBlogs, user }) {


  const [blogs, setblogs] = useState(allBlogs)
  const [loadmore, setloadmore] = useState(true)

  const loadmorefunc = async () => {
    const lastblog = blogs[blogs.length - 1]
    const q = query(collection(db, "data"), orderBy("randnum"), startAfter(lastblog.randnum))
    const querySnapshot = await getDocs(q)
    const newBlogs = querySnapshot.docs.map(docsnap => {
      return {
        ...docsnap.data(),
        id: docsnap.id
      }
    })
    setblogs(allBlogs.concat(newBlogs))
    setloadmore(false)

  }
  return (
    <div className={styles.all}>
      {
        user
          ?
          <div className={styles.maincomp}>
            {blogs.map((blog, key) => {

              return (
                <div key={key} className={styles.card}>
                  <img className={styles.img} src={blog.link} alt="" />
                  <p className={styles.title}>{blog.title}</p>
                  <button className={styles.readbtn}><Link href={`blogpost/${blog.id}`}>Read Blog</Link></button>
                </div>

              )
            })}
            {
              loadmore ?
                <button onClick={loadmorefunc}>load more</button>
                :
                <p>No more blogs</p>
            }

          </div>
          :
          <div className={styles.secondcompo}>
            <div className={styles.innercompo}>
              <h1>Welcome to Blogger , Please Login or SignUp to Explore</h1>
              <div className={styles.buttoncompo}>
                <button className={styles.logincompo}><Link href="/login">Login</Link></button>
                <button className={styles.signupcompo}><Link href="/signup">SignUp</Link></button>
              </div>
            </div>
          </div>
      }
    </div>



  )
}


export async function getServerSideProps(context) {
  const q = query(collection(db, "data"), limit(3), orderBy("randnum"))
  const querySnapshot = await getDocs(q);
  const allBlogs = querySnapshot.docs.map(docsnap => {
    return {
      ...docsnap.data(),
      id: docsnap.id
    }
  })
  return {
    props: { allBlogs }, // will be passed to the page component as props
  }
}
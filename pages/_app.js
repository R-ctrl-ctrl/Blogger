import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {auth} from '../firebase'
import  {useState,useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
function MyApp({ Component, pageProps }) {
  const [user,setuser] = useState(null)
  useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
          if(user){
            setuser(user)
          }
          else{
            setuser(null)
          }
      })
  },[])
  return (
    <>
    <Navbar user={user}/>
    <Component {...pageProps} user={user}/>
    </>
  )
}

export default MyApp

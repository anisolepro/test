"use client"
// css
import { useRouter } from 'next/navigation';
import './NavBar.css'


// custom hooks
import { useUserDetail } from '@/CustomHooks/useUserDetail';




export default function NavBar() {


    const userDetails = useUserDetail()
    const router = useRouter()




    return (
        <nav>
            <h1>
                Anisole CMS
            </h1>


            <div className='navBtns'>
                <h3>{userDetails && userDetails.username}</h3>

                <button
                    onClick={() => {
                        window.localStorage.clear();
                        router.push('/login')
                    }}
                >Logout</button>
            </div>
        </nav>
    )
}

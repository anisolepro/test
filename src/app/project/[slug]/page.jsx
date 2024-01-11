"use client"


// imports
import { useLayoutEffect, useState } from 'react';


// css
import './style.css'





// icons 
import { TiEdit } from "react-icons/ti";










// components
import NavBar from "@/components/NavBar/NavBar";








// custom hooks
import { useGetAPI } from "@/CustomHooks/useGetAPI";
import { useUserDetail } from "@/CustomHooks/useUserDetail";
import PreLoader, { useLoadingStop } from "@/components/PreLoader/PreLoader";










const route = ({ params }) => {

  // variables
  const projectId = params.slug;
  const [pageList, setpageList] = useState([])
  const [pageDetail, setpageDetail] = useState(null)
  const [contentDetail, setcontentDetail] = useState(null)





  // custom hooks
  const api = useGetAPI();
  const userDetails = useUserDetail();
  const loadingStop = useLoadingStop();







  // functions

  function createPageFunc() {
    const pageName = prompt('Enter Page Name : ');

    if (!pageName) return;



  }




  useLayoutEffect(() => {



    if (!userDetails) return
    else loadingStop('mainPage');





  }, [userDetails])






  return (
    <>
      <NavBar />
      <PreLoader
        id="mainPage"
      />


      <div className="mainCmsProjectPage">

        <div className='pageSection'>
          <h1 className='childCenter'>
            <span>
              Pages
            </span>
            <button
              onClick={createPageFunc}
              className='smoothTransition childCenter'>
              <TiEdit />
            </button>
          </h1>


          <div className='pageList'>


            {
              pageList.map(e => {
                return <button>name</button>
              })
            }



          </div>
        </div>

        {pageDetail &&
          <div className='contentSection'>
            <h1 className='childCenter'>Contents</h1>

          </div>
        }


        {contentDetail &&
          <div className='editSection'>
            <h1 className='childCenter'>Edit Section</h1>

          </div>

        }


      </div>
    </>
  )
}



export default route;
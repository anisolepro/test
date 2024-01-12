"use client"


// imports
import { useEffect, useLayoutEffect, useState } from 'react';


// css
import './style.css'





// icons 
import { TiEdit } from "react-icons/ti";
import { MdOutlineVerticalAlignTop } from "react-icons/md";
import { MdDelete } from "react-icons/md";








// components
import NavBar from "@/components/NavBar/NavBar";
import PreLoader, { useLoadingStart, useLoadingStop } from "@/components/PreLoader/PreLoader";
import Model from '@/components/CreateContentModel/CreateContentModel';








// custom hooks
import { useGetAPI } from "@/CustomHooks/useGetAPI";
import { useUserDetail } from "@/CustomHooks/useUserDetail";
import ToastMessage, { usePushToastMessage } from '@/components/ToastMessage/ToastMessage';
import SchemaElement from '@/components/SchemaElement/SchemaElement';











const route = ({ params }) => {

  // variables
  const projectId = params.slug.slice(3);
  const [contentList, setContentList] = useState([])
  const [contentDetail, setContentDetail] = useState(null)
  const [pageList, setPageList] = useState(null)
  const [pageDetail, setPageDetail] = useState(null)






  // custom hooks
  const api = useGetAPI();
  const userDetails = useUserDetail();
  const loadingStop = useLoadingStop();
  const loadingStart = useLoadingStart();
  const pushToastMessage = usePushToastMessage();






  // functions

  function _(el) { return document.querySelector(el) }

  function createContentBtnFunc() {

    _('.createContentModelDiv').classList.add('showModelDiv')
  }

  async function createPageFunc() {
    const pageName = prompt('Enter Page Name : ');

    if (!pageName) return;


    const data = await fetch(api + '/CMS/createPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageName,
        userId: userDetails._id,
        projectId,
        contentName: contentDetail.name

      })
    }).then(res => res.json())


    if (data.success) pushToastMessage(data.success)
    else if (data.err) pushToastMessage(data.err, "#fff", "#f00")



    fetchContentPages()


  }

  async function createContentFunc(contentName, contentSchema) {
    // const contentName = prompt('Enter content Name : ');

    if (!contentName || !contentSchema || !contentSchema.length) return;


    const data = await fetch(api + '/CMS/createContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contentName,
        contentSchema,
        userId: userDetails._id,
        projectId
      })
    }).then(res => res.json())

    if (data.success) pushToastMessage(data.success)
    else if (data.err) pushToastMessage(data.err, "#fff", "#f00")


    fetchProjectContents()


  }


  async function fetchProjectContents() {

    loadingStart('mainPage')

    const data = await fetch(api + '/CMS/getContents', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId,
        userId: userDetails._id
      })
    }).then(res => res.json())



    loadingStop('mainPage')
    // console.log(data)

    // if (!data.contents) return
    setContentList(data)


  }


  async function fetchContentPages() {

    loadingStart('mainPage')

    const data = await fetch(api + '/CMS/getPages', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId,
        userId: userDetails._id,
        contentName: contentDetail.name
      })
    }).then(res => res.json())



    loadingStop('mainPage')
    setPageList(data)




  }



  function contentChangeBtn(e) {
    setContentDetail({ ...e.content, _id: e._id })
    setPageDetail(null)
  }









  // use effects


  useLayoutEffect(() => {



    if (!userDetails) return
    else loadingStop('mainPage');


    fetchProjectContents()




  }, [userDetails]);



  useEffect(() => {
    if (!contentDetail) return;
    fetchContentPages()
  }, [contentDetail]);













  // return jsx

  return (
    <>
      <NavBar />
      <PreLoader
        id="mainPage"
      />
      <ToastMessage />

      <Model
        callBackSubmitFunc={createContentFunc}
        ModelHeading="Create Content"
      />


      <div className="mainCmsProjectcontent">

        <div className='contentSection'>
          <h3 className='childCenter'>
            <span>
              Content
            </span>
            <button
              onClick={createContentBtnFunc}
              className='smoothTransition childCenter'>
              <TiEdit />
            </button>
          </h3>


          <div className='contentList'>


            {
              contentList && contentList.map((e, i) => {

                return <button
                  className={(contentDetail && (e._id == contentDetail._id)) ? 'selectedcontent' : ""}
                  onClick={() => contentChangeBtn(e)}
                  key={i}
                >{e.content.name}</button>
              })
            }



          </div>
        </div>

        {contentDetail &&
          <div className='pageSection'>
            <h3 className='childCenter'>
              <span>
                {contentDetail.name}
              </span>




              <button
                onClick={createPageFunc}
                className='smoothTransition childCenter'>
                <TiEdit />
              </button>

            </h3>




            <div className='pageList'>

              {
                pageList && pageList.map((e, i) => {

                  if (!e.page) return
                  return <button
                    className={(pageDetail && (e._id == pageDetail._id)) ? 'selectedcontent' : ""}
                    onClick={() => setPageDetail({ ...e.page, _id: e._id })}
                    key={i}
                  >{e.page.name}</button>
                })
              }


            </div>

          </div>
        }


        {pageDetail &&
          <div className='editSection'>
            <h3 className='childCenter'>Edit Section</h3>

            <div className='SchemaElementList'>

              {contentDetail.schema.map(e => {
                console.log(e)
                return <SchemaElement

                  name={e.name}
                  type={e.type}
                />
              })}

            </div>

            <div className='workingEditOptions'>
              {/* todo */}

              <button><MdOutlineVerticalAlignTop /></button>

              <div>

                <button className='deleteBtn'><MdDelete /></button>
                <button
                  onClick={() => setPageDetail(null)}
                  className='DisCardBtn'>Discard</button>
                <button className='SaveBtn'>Save</button>
              </div>

            </div>

          </div>

        }


      </div>
    </>
  )
}



export default route;
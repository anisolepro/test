"use client"


import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";





// components 
import NavBar from "@/components/NavBar/NavBar";


// custom hooks
import { useGetAPI } from "@/CustomHooks/useGetAPI";
import { useUserDetail } from "@/CustomHooks/useUserDetail";
import Link from "next/link";
import PreLoader, { useLoadingStart, useLoadingStop } from "@/components/PreLoader/PreLoader";
import ToastMessage, { usePushToastMessage } from "@/components/ToastMessage/ToastMessage";







export default function Home() {



    const [projects, setProjects] = useState([])
    const router = useRouter();


    // custom hooks
    const api = useGetAPI();
    const userDetails = useUserDetail();
    const loadingStop = useLoadingStop();
    const loadingStart = useLoadingStart();
    const pushToastMessage = usePushToastMessage()









    // functions
    async function createNewProjectFunc() {

        const name = prompt("enter Project Name : ");

        if (!name) return;

        loadingStart('mainPage')


        const data = await fetch(api + '/CMS/createProject', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: name,
                userId: userDetails._id
            })
        }).then(res => res.json())


        if (data.success) pushToastMessage(data.success)
        else if (data.err) pushToastMessage(data.err, "#fff", "#f00")

        refreshProjectList()


    }



    async function refreshProjectList() {

        loadingStart('mainPage')
        const data = await fetch(api + '/CMS/getProjects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userDetails._id })
        }).then(res => res.json())



        loadingStop('mainPage')
        setProjects(data)

    }








    useLayoutEffect(() => {


        if (!userDetails) return
        refreshProjectList()



    }, [userDetails])








    return (
        <>
            <NavBar

            />

            <PreLoader
                id={'mainPage'}
            />

            <ToastMessage />
            <main>

                <h1 className="largeHeading">Projects</h1>


                <div className="ProjectListDiv childCenter smoothTransition">

                    {projects.map(project => {
                        return <Link
                            key={project._id}
                            className="projectDiv childCenter smoothTransition"
                            href={`/project/id-${project._id}`}
                            onClick={() => loadingStart('mainPage')}
                        >
                            <h1>{project.project}</h1>
                        </Link>
                    })}


                    <a
                        onClick={createNewProjectFunc}
                        className="projectDiv childCenter smoothTransition">
                        <h1>+</h1>
                    </a>


                </div>

            </main>
        </>
    )
}

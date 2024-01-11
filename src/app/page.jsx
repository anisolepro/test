"use client"


import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";





// components 
import NavBar from "@/components/NavBar/NavBar";


// custom hooks
import { useGetAPI } from "@/CustomHooks/useGetAPI";
import { useUserDetail } from "@/CustomHooks/useUserDetail";
import Link from "next/link";
import PreLoader, { useLoadingStop } from "@/components/PreLoader/PreLoader";







export default function Home() {



    const [projects, setProjects] = useState([])
    const router = useRouter();


    // custom hooks
    const api = useGetAPI();
    const userDetails = useUserDetail();
    const loadingStop = useLoadingStop();









    // functions
    function createNewProjectFunc() {

        const name = prompt("enter Project Name : ");

        if (!name) return;

        fetch(api + '/CMS/createProject', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: name,
                userId: userDetails._id
            })
        })
    }












    useLayoutEffect(() => {



        if (!userDetails) return


        fetch(api + '/CMS/getProjects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userDetails._id })
        }).then(res => res.json())
            .then(data => {
                loadingStop('mainPage')
                setProjects(data)
            })
    }, [userDetails])








    return (
        <>
            <NavBar

            />

            <PreLoader
                id={'mainPage'}
            />
            <main>

                <h1 className="largeHeading">Projects</h1>


                <div className="ProjectListDiv childCenter smoothTransition">

                    {projects.map(project => {
                        return <Link
                            key={project._id}
                            className="projectDiv childCenter smoothTransition"
                            href={`/project/id-${project._id}`}
                        >
                            <h1>{project.projectName}</h1>
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

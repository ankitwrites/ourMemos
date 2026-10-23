import { Navbar } from "../components/Navbar"
import { useState, useEffect } from "react"
import { useAuth } from "../store/auth"
import { CiViewBoard } from "react-icons/ci"
import { NavLink } from "react-router-dom"

 export const Groups = () => {
    const URI = import.meta.env.VITE_BACKEND_URI
    const { user, isLoggedIn, authToken, userAuthentication } = useAuth()
    const [isGroupAvl, setIsGroupAvl] = useState(true)
    const [groups, setGroups] = useState([])

    if(!isLoggedIn) {
            return <Navigate to="/login" />
        }

    const getGroups = async () => {
        try {
            const response = await fetch(`${URI}/api/group`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            })
            if (response.status === 404) {
                setIsGroupAvl(false)
            }
            if (response.status === 200){
                setIsGroupAvl(true)
                const data = await response.json()
                setGroups(data.message)
            }
        } catch (err) {
            console.log(`Error while fetching the Memos: ${err}`)
        }
    }

    useEffect(() => {
        getGroups()
        userAuthentication()
    }, [])

    if(isGroupAvl) {
        return (
            <>
                <Navbar />
                <div className="navspacer"></div>
                <main>
                    <div className="memos-container">
                        <h2>My Groups</h2>
                        <br></br>
                        {groups.map((currElem, index) => {
                            const { name, description } = currElem
                            return (
                                <div className="memo-container" key={index}>
                                    <div className="group-title">
                                        <h3>{name}</h3>
                                    </div>
                                    <div className="memo">
                                        <p>{description}</p>
                                        <NavLink to={`/group/${currElem._id}`}><CiViewBoard /></NavLink>
                                        {/* <button className="memo-delete" onClick={() => deleteMemo(currElem._id)}>
                                            <MdDelete />
                                        </button> */}
                                    </div>
                                </div>
                            )
                        }).reverse()}
                    </div>
                </main>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className="navspacer"></div>
                <main>
                <h1>No Groups Found...</h1>
                </main>
            </>
        )
    }
}
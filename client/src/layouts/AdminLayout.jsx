import { Outlet, NavLink, Navigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { MdDelete } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"

export const AdminLayout = () => {
    const URI = import.meta.env.VITE_BACKEND_URI
    const { user, authToken } = useAuth()
    const [users, setUsers] = useState([])

    /*if(!user.isAdmin){
        return <Navigate to="/" />
    }*/
        console.log(user.isAdmin)

    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3500/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            })
            const data = await response.json()
            setUsers(data)
        } catch (err) {
            console.log(`Error while fetching users: ${err}`)
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${URI}/api/admin/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authToken
                }
            })
            if(response.ok){
                getAllUsers()
            }
        } catch (err) {
            console.log(`Error while deleting user: ${err}`)
        }
    }

    const changeEditorStatus = async (id) => {
        try {
            const response = await fetch(`${URI}/api/editor/update/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authToken
                }
            })
            if(response.ok){
                getAllUsers()       
            }
        } catch (err) {
            console.log(`Error while updating Editor Status: ${err}`)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return <>
        <Navbar />
        <div className="navspacer"></div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Editor</th>
                    <th>Memos</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((currUser, index) => {
                    return <tr key={index}>
                        <td>{ currUser.username }</td>
                        <td>{ currUser.email }</td>
                        <td>{ currUser.phone }</td>
                        <td>
                            {
                                currUser.isAdmin? (<>
                                    Admin
                                </>):(<>
                                    {currUser.isEditor? (<>
                                        <button className="editorStatus" onClick={() => changeEditorStatus(currUser._id)}>
                                            <FaCheck />
                                        </button>
                                    </>):(<>
                                        <button className="editorStatus" onClick={() => changeEditorStatus(currUser._id)}>
                                        <ImCross />
                                        </button>
                                    </>)}
                                </>)
                            }
                        </td>
                        <td> <NavLink to={`/admin/memos/user/${currUser._id}`}>Show</NavLink> </td>
                        <td>
                            {
                                currUser.isAdmin? (<>
                                    Admin
                                </>):(<>
                                    <button className="memo-delete" onClick={() => deleteUser(currUser._id)}>
                                        <MdDelete />
                                    </button>
                                </>)
                            }
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}
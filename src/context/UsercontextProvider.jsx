import React, { useState } from 'react'
import userContext from './userContext';

const UsercontextProvider = ({ children }) => {
    const [currentuser, setCurrentUser] = useState({role:"Admin"});
    return (
        <userContext.Provider value={{ currentuser, setCurrentUser }}>
            { children }
        </userContext.Provider>
    )
}

export default UsercontextProvider

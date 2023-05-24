import React, { useState, useEffect } from "react"
import axios from "axios"

const AuthContext = React.createContext()

const API_URL = process.env.REACT_APP_API_URL

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggedInTher, setIsLoggedInTher] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTher, setIsLoadingTher] = useState(true)
  const [user, setUser] = useState(null)
  const [therapist, setTherapist] = useState(null)

  const storedToken = (token) => {
    localStorage.setItem("authToken", token)
  }

  const storedTherapistToken = (token) => {
    localStorage.setItem("authTherapistToken", token)
  }

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken")

    if (storedToken) {
      axios

        .get(`${API_URL}/auth/userverify`, { headers: { Authorization: `Bearer ${storedToken}` } }) //this verifies the user

        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data

          // Update state variables
          setIsLoggedIn(true)
          setIsLoading(false)
          setUser(user)
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          console.error(error)
          setIsLoggedIn(false)
          setIsLoading(false)
          setUser(null)
        })
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }

  const authenticateTherapist = () => {
    const storedTherapistToken = localStorage.getItem("authTherapistToken")
    if (storedTherapistToken) {
      axios

        .get(`${API_URL}/auth/therapistverify`, { headers: { Authorization: `Bearer ${storedTherapistToken}` } }) //this verifies the therapist

        .then((response) => {
          const therapist = response.data

          setIsLoggedInTher(true)
          setIsLoadingTher(false)
          setTherapist(therapist)
        })
        .catch((error) => {
          console.error(error)
          setIsLoggedInTher(false)
          setIsLoadingTher(false)
          setTherapist(null)
        })
    } else {
      setIsLoggedInTher(false)
      setIsLoadingTher(false)
      setTherapist(null)
    }
  }
  const removeUserToken = () => {
    localStorage.removeItem("authToken")
  }

  const removeTherapistToken = () => {
    localStorage.removeItem("authTherapistToken")
  }

  const logOutUser = () => {
    if (user) {
      removeUserToken()
      authenticateUser()
    } else if (therapist) {
      removeTherapistToken()
      authenticateTherapist()
    }
  }

  useEffect(() => {
    authenticateUser()
    authenticateTherapist()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoggedInTher,
        isLoading,
        isLoadingTher,
        user,
        therapist,
        storedTherapistToken,
        storedToken,
        authenticateUser,
        authenticateTherapist,
        logOutUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }

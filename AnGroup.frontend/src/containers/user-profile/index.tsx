import React from 'react'
import UserProfileForm from './components/details'
import { UserProfileForDetails } from './components/header'

const UserProfileContainer = () => {
  return (
    <div>
      <UserProfileForDetails />
      <UserProfileForm />
    </div>
  )
}

export default UserProfileContainer

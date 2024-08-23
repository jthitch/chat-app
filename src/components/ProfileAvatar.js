import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitals } from '../misc/helpers'

const ProfileAvatar = ({name, ...avatarProps}) => {
  return (
    <Avatar circle {...avatarProps}>
        getNameInitals(name);    
        
    </Avatar>
  )      
}

export default ProfileAvatar
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  children: React.ReactNode
}

export const CustomNavLink = ({ to, children }: Props) => {
  const isActive = window.location.pathname.includes(to)
  const className = isActive ? 'active' : ''

  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  )
}

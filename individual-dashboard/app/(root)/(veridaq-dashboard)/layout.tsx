import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from 'next/image'

export default function IndividualDashboard({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid grid-rows-[auto] grid-cols-[auto_1fr]">
      <Nav />
      <div className="p-4 bg-[#E1D7E2]">
        
        {children}
      </div>
    </div>
  )
}

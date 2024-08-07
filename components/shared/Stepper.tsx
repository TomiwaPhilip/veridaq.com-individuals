"use client"

import React from "react"
import WorkReference from "../form/workReference/workReference"
import StudentshipStatus from "../form/studentshipstatus/studentshipStatus"
import MembershipReference from "../form/membershipReference/membershipReference"
import DocumentVerification from "../form/documentVerification/documentVerification"
import IndividualRequest from "../form/individualRequest/individualRequest"
import HandsOnReference from "../form/handsOnExperience/handsOnExperience"

interface StepperFormProps {
  id: string
  docId?: string | null
}

const StepperForm: React.FC<StepperFormProps> = ({ id, docId }) => {
  let content
  let title

  switch (id) {
    case "1":
      content = <WorkReference />
      title = "Request Work Reference Veridaq" // Change the title based on the id
      break
    case "2":
      content = <StudentshipStatus />
      title = "Request Studentship Status Veridaq" // Change the title based on the id
      break
    case "3":
      content = <MembershipReference />
      title = "Request Membership Reference Veridaq" // Change the title based on the id
      break
    case "4":
      content = <DocumentVerification />
      title = "Request Document Verification Veridaq" // Change the title based on the id
      break
    case "5":
      content = <IndividualRequest docId={docId} />
      title = "Request Individual Reference Veridaq." // Change the title based on the id
      break
    case "6":
      content = <HandsOnReference />
      title = "Request Hands-On Experience Reference Veridaq." // Change the title based on the id
      break
    // Include cases for other card ids if needed
    default:
      content = null
      title = "Modal Stepper Form"
  }

  return (
    <div>
      <h2 className="font-semibold text-[24px] px-8 pt-8">{title}</h2>
      {content}
    </div>
  )
}

export default StepperForm

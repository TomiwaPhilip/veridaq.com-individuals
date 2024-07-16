"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { RiLoader4Line } from "react-icons/ri"

import {
  getIssuedIndividualReference,
  getIssuedWorkReference,
  getIssuedAdminWorkReference,
  getIssuedHandsOnReference,
  getIssuedHandsOnReferenceAdmin,
} from "@/lib/actions/request.action"
import { SearchBar, Card3 } from "@/components/shared/shared"
import { BaseFramerAnimation } from "../shared/Animations"

export default function Store() {
  interface Documents {
    heading: string
    DocId: string
    textColor: string
    bgColor: string
    outlineColor: string
    link: string
  }

  interface Documents {
    heading: string
    DocId: string
    textColor: string
    bgColor: string
    outlineColor: string
    link: string
  }

  const [individualReferenceDoc, setIndividualReferenceDoc] = useState<
    Documents[]
  >([])
  const [workReferenceDoc, setWorkReferenceDoc] = useState<Documents[]>([])
  const [handsOnReferenceDoc, setHandsOnReferenceDoc] = useState<Documents[]>(
    []
  )
  // const [docVerificationDoc, setDocVerificationDoc] = useState<Documents[]>([]);
  // const [studentStatusDoc, setStudentStatusDoc] = useState<Documents[]>([]);
  const [adminWorkReferenceDoc, setAdminWorkReferenceDoc] = useState<
    Documents[]
  >([])
  const [adminHandsOnReferenceDoc, setAdminHandsOnReferenceDoc] = useState<
    Documents[]
  >([])
  // const [adminDocVerificationDoc, setAdminDocVerificationDoc] = useState<
  //   Documents[]
  // >([]);
  // const [adminStudentStatusDoc, setAdminStudentStatusDoc] = useState<
  //   Documents[]
  // >([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await getIssuedIndividualReference()
        if (doc) setIndividualReferenceDoc(doc)
        console.log(individualReferenceDoc)

        const doc1 = await getIssuedWorkReference()
        if (doc1) setWorkReferenceDoc(doc1)

        const doc2 = await getIssuedHandsOnReference()
        if (doc2) setHandsOnReferenceDoc(doc2)

        // const doc3 = await getIssuedDocVerification();
        // if (doc3) setDocVerificationDoc(doc3);

        // const doc4 = await getIssuedStudentshipStatus();
        // if (doc4) setStudentStatusDoc(doc4);

        const doc5 = await getIssuedAdminWorkReference()
        if (doc5) setAdminWorkReferenceDoc(doc5)

        const doc6 = await getIssuedHandsOnReferenceAdmin()
        if (doc6) setAdminHandsOnReferenceDoc(doc6)

        // const doc7 = await getIssuedAdminDocVerification();
        // if (doc7) setAdminDocVerificationDoc(doc7);

        // const doc8 = await getIssuedAdminStudentshipStatus();
        // if (doc8) setAdminStudentStatusDoc(doc8);

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="mt-[60px]">
      <div className="">
        <SearchBar />
      </div>
      {!isLoading ? (
        <BaseFramerAnimation>
          <>
            {workReferenceDoc.length > 0 ||
            handsOnReferenceDoc.length > 0 ||
            individualReferenceDoc.length > 0 ||
            adminWorkReferenceDoc.length > 0 ||
            adminHandsOnReferenceDoc.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center mt-[30px]">
                {/* Render cards for each type of document */}
                {workReferenceDoc.map((doc: Documents) => (
                  <Card3
                    key={doc.DocId} // Ensure each Card component has a unique key
                    heading={doc.heading}
                    textColor={doc.textColor}
                    bgColor={doc.bgColor}
                    outlineColor={doc.outlineColor}
                    link={doc.link}
                  />
                ))}
                {individualReferenceDoc.map((doc: Documents) => (
                  <Card3
                    key={doc.DocId} // Ensure each Card component has a unique key
                    heading={doc.heading}
                    textColor={doc.textColor}
                    bgColor={doc.bgColor}
                    outlineColor={doc.outlineColor}
                    link={doc.link}
                  />
                ))}
                {handsOnReferenceDoc.map((doc: Documents) => (
                  <Card3
                    key={doc.DocId} // Ensure each Card component has a unique key
                    heading={doc.heading}
                    textColor={doc.textColor}
                    bgColor={doc.bgColor}
                    outlineColor={doc.outlineColor}
                    link={doc.link}
                  />
                ))}
                {/* {docVerificationDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))} */}
                {/* {studentStatusDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))} */}
                {adminWorkReferenceDoc.map((doc: Documents) => (
                  <Card3
                    key={doc.DocId} // Ensure each Card component has a unique key
                    heading={doc.heading}
                    textColor={doc.textColor}
                    bgColor={doc.bgColor}
                    outlineColor={doc.outlineColor}
                    link={doc.link}
                  />
                ))}
                {adminHandsOnReferenceDoc.map((doc: Documents) => (
                  <Card3
                    key={doc.DocId} // Ensure each Card component has a unique key
                    heading={doc.heading}
                    textColor={doc.textColor}
                    bgColor={doc.bgColor}
                    outlineColor={doc.outlineColor}
                    link={doc.link}
                  />
                ))}
                {/* {adminDocVerificationDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))} */}
                {/* {adminStudentStatusDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))} */}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full mt-[3rem]">
                <Image
                  src="/assets/images/error.png"
                  alt="No Document Found"
                  width={200}
                  height={200}
                />
                <p className="text-center mt-2">You have no Documents yet!</p>
              </div>
            )}
          </>
        </BaseFramerAnimation>
      ) : (
        <div className="flex items-center justify-center h-full mt-[3rem]">
          <RiLoader4Line className="animate-spin text-2xl mb-4" />
          <p className="font-bold">Loading...</p>
        </div>
      )}
    </main>
  )
}

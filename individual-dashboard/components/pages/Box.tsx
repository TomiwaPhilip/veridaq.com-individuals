"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import { RiLoader4Line } from "react-icons/ri"

import ModalWithStepper from "@/components/shared/Modal"
import {
  SearchBar2,
  VeridaqDocument,
  useSession,
} from "@/components/shared/shared"
import { getIndividualReference } from "@/lib/actions/request.action"
import { BaseFramerAnimation } from "../shared/Animations"
import InfiniteScroll from "react-infinite-scroll-component"

export default function Box() {
  interface Documents {
    DocDetails: string
    DocId: string
    DocDate: string
  }

  const [openModalId, setOpenModalId] = useState<string | null>(null)
  const [openModalDocId, setOpenModalDocId] = useState<string | null>(null)
  const [individualReferenceDoc, setIndividualReferenceDoc] = useState<
    Documents[]
  >([])
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true)

  const [individualReferencesState, setindividualReferencesState] = useState<
    Documents[]
  >([])
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = () => {
    setTimeout(() => {
      setindividualReferencesState(
        individualReferenceDoc.slice(0, individualReferencesState.length + 1)
      )
    })
    if (individualReferencesState.length === individualReferenceDoc.length)
      setHasMore(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc1 = await getIndividualReference()
        if (doc1) {
          setIndividualReferenceDoc(doc1)
          setindividualReferencesState(doc1.slice(0, 10))
        }
        console.log(individualReferenceDoc)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    fetchData()
  }, [])

  const handleOpenModal = (id: string, docId: string) => {
    setOpenModalId(id)
    setOpenModalDocId(docId)
  }

  const handleCloseModal = () => {
    setOpenModalId(null)
  }

  return (
    <main className="mt-[30px]">
      <div className="mb-[40px]">
        <p className="font-semibold text-[28px] text-[#38313A]">
          Pending Issuance
        </p>
        <p className="text-sm text-[#38313A]">
          Pending Veridaq Issuance from Individual Veridaq Request to you.
        </p>
        <div className="mt-10">
          <div className="">
            <div className="p-7 bg-[#C3B8D8] rounded-lg h-full">
              <div className="">
                <SearchBar2
                  onChange={(e) => {
                    const value = e.target.value

                    // Individual Reference Search
                    const newIndividualRefData = individualReferenceDoc.filter(
                      (indiRef) => {
                        return indiRef.DocDetails.includes(value)
                      }
                    )
                    setindividualReferencesState(newIndividualRefData)
                  }}
                />
              </div>
              <div className="mt-10 overflow-auto">
                {!isLoading ? (
                  <BaseFramerAnimation>
                    <>
                      {individualReferenceDoc &&
                      individualReferenceDoc.length > 0 ? (
                        <>
                          <InfiniteScroll
                            dataLength={individualReferencesState.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                              <div className="flex items-center justify-center h-full">
                                <RiLoader4Line className="animate-spin text-2xl mb-4" />
                                <p>Loading...</p>
                              </div>
                            }
                          >
                            {individualReferencesState.map((doc: Documents) => (
                              <VeridaqDocument
                                key={doc.DocId}
                                DocDetails={doc.DocDetails}
                                DocDate={doc.DocDate}
                                docId={doc.DocId}
                                id="5"
                                onClick={handleOpenModal}
                              />
                            ))}
                          </InfiniteScroll>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Image
                            src="/assets/images/error.png"
                            alt="No Document Found"
                            width={200}
                            height={200}
                          />
                          <p className="text-center mt-2">
                            You have no Documents yet!
                          </p>
                        </div>
                      )}
                    </>
                  </BaseFramerAnimation>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <RiLoader4Line className="animate-spin text-2xl mb-4" />
                    <p className="font-bold">Loading...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TO DO Implement endless scrolling or pagination. */}
      {openModalId && (
        <ModalWithStepper
          id={openModalId}
          onClose={handleCloseModal}
          docId={openModalDocId}
        />
      )}
    </main>
  )
}

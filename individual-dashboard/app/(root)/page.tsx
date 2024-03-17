import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-[#E1D7E2]">
      <label
        htmlFor="search"
        className="flex items-center gap-4 gradient-border1 w-max p-2 ml-auto rounded-md mt-8"
      >
        <input
          type="text"
          id="search"
          placeholder="search"
          className="border-none outline-none block bg-transparent w-[250px] text-[#5E5C64] placeholder:text-[#5E5C64] capitalize"
        />
        <Image
          src="/search.svg"
          width={25}
          height={25}
          className="object-contain"
          alt="search"
        />
      </label>
    </div>
  )
}

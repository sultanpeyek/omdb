import Image from 'next/image'
import {useRef, useState} from 'react'
import {AiOutlineZoomIn} from 'react-icons/ai'

import ModalPreview from '@/components/common/ModalPreview'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const Detail = () => {
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false)

  const handleImageClick = () => {
    setIsModalPreviewOpen(true)
  }

  const ref = useRef()

  useOnClickOutside(ref, () => setIsModalPreviewOpen(false))

  return (
    <div className="py-4 text-white bg-gray-700 md:py-8">
      <div className="container">
        <div className="flex-row justify-between block w-full md:flex">
          <div
            className="basis-[300px] max-w-[300px] group relative cursor-pointer mx-auto md:order-2"
            onClick={handleImageClick}
          >
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
              alt=""
              layout="responsive"
              width={300}
              height={423}
              draggable={false}
            />
            <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/20 group-hover:opacity-100"></div>
            <AiOutlineZoomIn
              className="absolute transition-opacity duration-200 opacity-0 right-4 bottom-4 group-hover:opacity-100"
              size={32}
            />
          </div>
          <div className="flex-auto py-2 mb-2 md:order-1">
            <h2 className="mb-4 text-3xl">The Dark Knight</h2>
            <p>Released in 2010</p>
          </div>
        </div>
      </div>
      <ModalPreview modalRef={ref} open={isModalPreviewOpen} />
    </div>
  )
}

export default Detail

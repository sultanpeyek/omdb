import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'

const ModalPreview = ({open, modalRef}: any) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full z-50 bg-black/70 ${
        open ? 'block' : 'hidden'
      }`}
    >
      <AiOutlineClose
        size={32}
        className="absolute text-white cursor-pointer top-4 right-4"
      />
      <div
        ref={modalRef}
        className="relative max-w-lg mx-auto top-[50%] -translate-y-[50%]"
      >
        <Image
          src="https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
          alt=""
          width={1000}
          height={1000}
          layout="responsive"
          objectFit="contain"
          objectPosition="center"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default ModalPreview

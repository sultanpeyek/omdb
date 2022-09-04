import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'

import useOnClickOutside from '@/hooks/useOnClickOutside'
import {isValidUrl} from '@/utils'

export type ModalPreviewProps = {
  poster: string
  onClickOutside: () => void
  open: true
  onCloseButtonClick: () => void
}

const ModalPreview = (props: ModalPreviewProps) => {
  const fallbackSrc = '/assets/placeholder.png'
  const [posterSrc, setPosterSrc] = useState(
    isValidUrl(props.poster) ? props.poster : fallbackSrc,
  )

  useEffect(() => {
    if (isValidUrl(props.poster)) {
      setPosterSrc(props.poster)
    }
  }, [props.poster])

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    props.onClickOutside && props.onClickOutside()
  })

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full z-50 bg-black/70 ${
        props.open ? 'block' : 'hidden'
      }`}
      data-testid="modal-preview"
    >
      <AiOutlineClose
        size={32}
        className="absolute text-white cursor-pointer top-4 right-4"
        onClick={props.onCloseButtonClick}
      />
      <div
        ref={ref}
        className="relative max-w-lg mx-auto top-[50%] -translate-y-[50%]"
      >
        <Image
          src={posterSrc}
          alt=""
          width={1000}
          height={1000}
          layout="responsive"
          objectFit="contain"
          objectPosition="center"
          draggable={false}
          onLoadingComplete={result => {
            if (result.naturalWidth === 0) {
              // Broken image
              setPosterSrc(fallbackSrc)
            }
          }}
          onError={() => {
            setPosterSrc(fallbackSrc)
          }}
        />
      </div>
    </div>
  )
}

export default ModalPreview

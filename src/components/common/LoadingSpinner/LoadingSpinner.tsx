import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full min-h-[300px] text-center">
      <span className="self-center rotate-360 animate-spin">
        <AiOutlineLoading3Quarters size={64} />
      </span>
    </div>
  )
}

export default LoadingSpinner

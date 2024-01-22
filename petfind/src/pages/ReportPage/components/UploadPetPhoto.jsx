import { Button } from '@nextui-org/react'
import { useState } from 'react'
import CloseIcon from '../../../components/Icons/CloseIcon'
import UploadIcon from '../../../components/Icons/UploadIcon'

export default function UploadPetPhoto () {
  const [petPhoto, setPetPhoto] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPetPhoto(imageUrl)
    }
  }

  const handleResetPhoto = () => {
    setPetPhoto(null)
    const fileInput = document.getElementById('dropzone-file')
    if (fileInput) {
      fileInput.value = null
    }
  }

  return (
    <div className='flex items-center justify-center w-[300px]'>
      <div className={`relative items-center justify-center w-[300px] ${petPhoto ? '' : 'hidden'}`}>
        <img src={petPhoto} alt='pet' className='object-cover w-full h-64 rounded-lg' />
        <Button
          isIconOnly
          className='absolute bottom-[10px] right-[10px] w-10 h-10 rounded-full bg-red-500'
          onClick={handleResetPhoto}
        >
          <CloseIcon width={20} height={20} fill='fill-white' />
        </Button>
      </div>
      <label htmlFor='dropzone-file' className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${petPhoto ? 'hidden' : ''}`}>
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <UploadIcon />
          <p className='mb-2 text-sm text-neutral-500'><span className='font-semibold'> Arrastra y suelta </span> la foto de tu mascota</p>
          <p className='text-xs text-neutral-500'>SVG, PNG, JPG (MAX. 800x400px)</p>
        </div>
        <input
          id='dropzone-file'
          name='photo'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handlePhotoChange}
        />
      </label>
    </div>
  )
}

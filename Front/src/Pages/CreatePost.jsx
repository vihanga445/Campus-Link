import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload, FaEdit, FaLayerGroup } from 'react-icons/fa';

export default function CreatePost() {
  return (
    <div className='p-4 max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-lg shadow-lg'>
      <h1 className='text-center text-4xl my-8 font-bold text-blue-700 flex items-center justify-center gap-2'>
        <FaEdit className='text-blue-500' /> Create a Post
      </h1>
      <form className='flex flex-col gap-6'>
        {/* Title and Category */}
        <div className='flex flex-column gap-6 sm:flex-row justify-between'>
          <div className='flex-column w-full'>
            <TextInput
              type='text'
              placeholder='Title'
              className='border-blue-400 focus:ring-blue-500 focus:border-blue-500'
              required
            />

          </div>
          <div className='flex items-center w-full'>
            <FaLayerGroup className='text-blue-500 mr-2' />
            <Select className='border-blue-400 focus:ring-blue-500 focus:border-blue-500 flex-1'>
              <option value='uncategorized'>Select a category</option>
              <option value='Event'>Event</option>
              <option value='lost-found'>lost-found</option>
              <option value='memberships'>memberships</option>
            </Select>
          </div>
        </div>

        {/* File Upload Section */}
        <div className='flex gap-6 items-center justify-between border-4 border-indigo-400 border-dashed p-4 bg-indigo-50 rounded-lg'>
          <div className='flex items-center'>
            <FaUpload className='text-indigo-500 mr-2' />
            <FileInput
              type='file'
              accept='image/*'
              className='file:bg-indigo-200 file:border-indigo-400 file:font-semibold file:rounded-lg file:cursor-pointer'
            />
          </div>
          <Button
            type='button'
            gradientDuoTone='tealToLime'
            size='sm'
            className='hover:scale-105 flex items-center gap-2'
            outline
          >
            <FaUpload />
            Upload Image
          </Button>
        </div>

        {/* Text Editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something amazing...'
          className='h-64 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-500'
          required
        />

        {/* Submit Button */}
        <Button
          type='submit'
          gradientDuoTone='cyanToBlue'
          className='text-lg font-semibold transform hover:scale-105 flex items-center gap-2'
        >
          <FaEdit />
          Publish
        </Button>
      </form>
    </div>
  );
}

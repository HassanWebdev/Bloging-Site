'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { uploadImageToFirebase } from './uploadeImage';
import Link from 'next/link';
import { Circles, ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Editoor = ({ user }) => {
  const route = useRouter()
  const [loading, setloading] = useState(false);
  const [imgUrl, setImg] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleEditorChange = (content: string, editor: any) => {
    setContent(content);
  };

  const frameworks = [
    { value: 'technology', label: 'Technology' },
    { value: 'wild life', label: 'Wild Life' },
    { value: 'natural', label: 'Natural' },
    { value: 'general', label: 'General' },
    { value: 'other', label: 'Other' },
  ];

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!title.trim()) {
      formErrors.title = 'Title cannot be empty';
      isValid = false;
    }

    if (!value) {
      formErrors.category = 'Category cannot be empty';
      isValid = false;
    }

    if (!content.trim()) {
      formErrors.content = 'Content cannot be empty';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleImg = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const { url } = await uploadImageToFirebase(e.target.files[0]);
      setImg(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setloading(true);
      const Posts = { email:user.email, img: imgUrl, title, content, category: value };
      await axios
        .post(
         'https://next-js-drab-chi.vercel.app/enter',
          JSON.stringify({ email: user.email, Posts })
        )
        .then((res) => {toast.success(`Publish Successfully`);route.push('/Myblog')});
    }
  };

  return (
    <div className='flex justify-center items-center '>
      {loading ? (
        <ThreeDots height='500' width='500' />
      ) : (
        <div className='flex justify-center w-full bg-zinc-100 flex-col items-center gap-10'>
          <h1 className='font-title text-7xl block mt-4 tracking-wide'>
            New Blog
          </h1>
          <form
            onSubmit={handleSubmit}
            className='w-[50vw] flex flex-col gap-3'
          >
            <h1 className='font-title text-3xl'>Title</h1>
            <div className='relative'>
              <input
                id='text'
                type='text'
                placeholder='Title of Blog'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`h-12 w-full rounded-3xl px-5 font-title text-xl ${
                  errors.title ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.title && (
                <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
              )}
            </div>

            <h1 className='font-title text-3xl mt-4'>Category</h1>
            <div className='relative'>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className={`w-full justify-between ${
                      errors.category ? 'border-2 border-red-500' : ''
                    }`}
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : 'Select Category...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[50vw] p-0'>
                  <Command>
                    <CommandInput placeholder='Search Category...' />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? '' : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === framework.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.category && (
                <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
              )}
            </div>

            <div>
              <h1 className='font-title text-3xl py-2'>Upload image</h1>
              <div
                className={`relative ${
                  errors.file ? 'border-2 border-red-500 p-2 rounded' : ''
                }`}
              >
                <input
                  type='file'
                  accept='image/*'
                  className='font-title text-xl'
                  onChange={handleImg}
                />
                {errors.file && (
                  <p className='text-red-500 text-sm mt-1'>{errors.file}</p>
                )}
              </div>
            </div>

            <div className='mt-4'>
              <h1 className='font-title text-3xl mb-2'>Content</h1>
              <div
                className={`relative ${
                  errors.content ? 'border-2 border-red-500 p-2 rounded' : ''
                }`}
              >
                <Editor
                  apiKey='1rif8v1scs3zj3rf3u6dbpu6ck2owndmylh2v9red697kawr'
                  initialValue=''
                  init={{
                    height: 400,
                    width: 650,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount',
                    ],
                    toolbar:
                      'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:20px }',
                  }}
                  onEditorChange={handleEditorChange}
                />
                {errors.content && (
                  <p className='text-red-500 text-sm mt-1'>{errors.content}</p>
                )}
              </div>
            </div>

            <button
              type='submit'
              className='font-title text-xl bg-green-400 px-4 py-3 text-white transition-all hover:bg-white hover:border-green-400 border-2 hover:text-green-400 rounded-xl mt-4'
            >
              Publish
            </button>
          </form>

          <div className='w-full h-52 px-6'>
            <div className='w-full h-64 bg-black flex flex-col justify-center items-center'>
              <h1 className='font-bold text-[5vw] text-white tracking-widest transition-all hover:tracking-[4vw]'>
                <Link href='/'>VOID</Link>
              </h1>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Editoor;

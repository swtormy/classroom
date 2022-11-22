import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Task = () => {

    const { textArea, setTextArea } = useStateContext()
    const [nText, setNText] = useState()

    const preText = (text) => {
        var result = []
        var row = []

        text.split(' ').map((word, index) => {
            // console.log(word, word.search(','));
            if ((index % 6) === 0) {
                row.push(word)
                result.push(row)
                row = []
            } else {
                row.push(word)
            }
        })


        return result
    }

    const getSkip = (e) => {
        e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText.trim().replace(/^[0-9A-ZА-ЯЁ]+$/i, '_____')
        // var sym = e.target.innerText.trim().length

        // e.target.innerText = e.target.innerText.trim().replace(/^[0-9A-ZА-ЯЁ]+$/i, '_'.repeat(sym))
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        if (textArea !== undefined) {
            setNText(preText(textArea));
        }

    }, [textArea])

    if (!textArea) return <></>
    return (
        <div className='container mx-auto px-4 flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-sm'>
            < div className='text-2xl font-bold pb-2' >

                <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Task</h5> */}
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        {/* <span className="text-3xl font-semibold"></span> */}
                        <span className="text-5xl font-extrabold tracking-tight">Task</span>
                        <span className="ml-5 text-xl font-normal text-gray-500 dark:text-gray-400">no.1</span>
                    </div>
                    {/* <p className='text-base text-gray-500 whitespace-pre-line dark:text-gray-400'></p> */}
                    <div>
                        <div className='flex flex-col text-base text-gray-500 py-4'>
                            {nText &&
                                nText.map((row, index) => {
                                    return (<div key={row + index} id={row + index} className='flex flex-row'>
                                        {row.map((word, index) => {
                                            return (
                                                <Menu key={row + index} as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button className="cursor-pointer hover:text-gray-200">

                                                            {word.trim()}&nbsp;


                                                        </Menu.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md divide-gray-100 dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-100',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Word settings
                                                                        </span>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-100',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                            onClick={getSkip}
                                                                        >
                                                                            Insert skip 
                                                                        </span>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>

                                            )
                                        })}
                                    </div>)
                                })
                            }
                            {/* {textArea.split(' ').map((word, index) => {
                                if(word>0){
                                    return (
                                        <p className='text-base text-gray-500 dark:text-gray-400'>{word}</p>
                                    )
                                }else{
                                    return <><p className='text-base text-gray-500 dark:text-gray-400'>{word}</p> <br/> </>
                                }
                            })
                            } */}
                        </div>
                    </div>

                    {/* <ul role="list" className="space-y-5 my-7">
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">2 team members</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">20GB Cloud storage</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Integration help</span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500">Sketch Files</span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">

                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500">API Access</span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500">Complete documentation</span>
                        </li>
                        <li className="flex space-x-3 line-through decoration-gray-500">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500">24×7 phone & email support</span>
                        </li>
                    </ul> */}
                    <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
                </div>
            </div>
        </div>
    )
}

export default Task
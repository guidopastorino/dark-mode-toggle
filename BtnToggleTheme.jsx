'use client'

import { AppThemeContext } from '@/context/AppThemeContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCheck, BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import { MdBrightness6 } from 'react-icons/md'

const BtnToggleTheme = () => {

    const { theme, setTheme } = useContext(AppThemeContext)

    const [menu, setMenu] = useState(false)

    const MenuButtonRef = useRef()
    const MenuRef = useRef()

    useEffect(() => {
        let handler = e => {
            if (e.target == MenuButtonRef.current) return;
            if (menu) {
                if (!MenuRef.current.contains(e.target)) {
                    setMenu(false)
                }
            }
        }

        document.addEventListener('mousedown', handler)

        return () => document.removeEventListener('mousedown', handler)
    })

    return (
        <div className='relative'>
            <button ref={MenuButtonRef} onClick={() => setMenu(!menu)} className={`${menu && 'bg-gray-200 dark:bg-neutral-700'} w-10 h-10 rounded-full flex justify-center items-center dark:text-white active:scale-90 duration-75 hover:bg-gray-200 dark:hover:bg-neutral-700`}>
                {theme === 'light' && <BsSunFill />}
                {theme === 'dark' && <BsMoonStarsFill />}
                {theme.startsWith('os') && <MdBrightness6 />}
            </button>

            {menu && <ul ref={MenuRef} className='absolute top-14 right-0 z-50 rounded-lg shadow-lg p-2 border dark:border-neutral-600 w-36'>
                <li onClick={() => setTheme('light')} className='flex justify-between cursor-pointer rounded-lg text-sm active:bg-gray-300 dark:text-white active:scale-95 duration-75 p-2 dark:active:brightness-75 hover:bg-gray-200 dark:hover:bg-neutral-700 items-center gap-2'>
                    <span>Light</span>
                    {theme == 'light' && <BsCheck className='text-xl' />}
                </li>
                <li onClick={() => setTheme('dark')} className='flex justify-between cursor-pointer rounded-lg text-sm active:bg-gray-300 dark:text-white active:scale-95 duration-75 p-2 dark:active:brightness-75 hover:bg-gray-200 dark:hover:bg-neutral-700 items-center gap-2'>
                    <span>Dark</span>
                    {theme == 'dark' && <BsCheck className='text-xl' />}
                </li>
                <li onClick={() => setTheme('os')} className='flex justify-between cursor-pointer rounded-lg text-sm active:bg-gray-300 dark:text-white active:scale-95 duration-75 p-2 dark:active:brightness-75 hover:bg-gray-200 dark:hover:bg-neutral-700 items-center gap-2'>
                    <span>OS Default</span>
                    {theme.startsWith('os') && <BsCheck className='text-xl' />}
                </li>
            </ul>}
        </div>
    )
}

export default BtnToggleTheme
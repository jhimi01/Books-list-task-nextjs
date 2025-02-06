import React from 'react'
import genres from "../../../public/genere.json"; 

export default function SidebarBooks() {
  return (
    <div className='w-full bg-gray-100'>
        <h2 className=' text-2xl font-semibold text-center py-2'>Genere</h2>
      <ul className="">
        {genres.map((genre) => (
          <li key={genre.id}>
            <button className="w-full text-start text-gray-600 px-4 py-2 duration-200 hover:bg-primary-700">
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

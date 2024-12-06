import Image from 'next/image';
import React from 'react'


interface School {
    id: number;             // Unique identifier for the school
    name: string;           // Name of the school
    address: string;        // Address of the school
    city: string;           // City where the school is located
    state: string;          // State where the school is located
    contact: string;        // Contact number for the school
    email_id: string;       // Email address for the school
    image: string;         // Optional image URL for the school
}
const SchoolCard: React.FC<School> = ({ id, name, address, city, state, contact, image, email_id }) => {
    return (
        <div className='w-[300px] cursor-pointer h-fit mx-auto md:mx-0 shadow-md rounded-md overflow-hidden'>

            {
                image && (
                    <div className="overflow-hidden  h-[250px]">
                        <div
                            className="w-full h-full overflow-hidden bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
                            style={{
                                backgroundImage: `url(${image})`,
                            }}
                        >
                        </div>
                    </div>
                )
            }

            <div className='flex flex-col gap-1 my-3 p-2'>
                <h2 className='text-md  capitalize font-semibold'>{name} </h2>
                <div className="text-gray-500 capitalize">
                    <p >{address}</p>
                    <p>{city} {state}</p>
                </div>
            </div>
        </div>
    )
}

export default SchoolCard

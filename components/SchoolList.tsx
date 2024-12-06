'use client'
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import SchoolCard, { School } from './SchoolCard';
import Spinner from './Spinner';

export default function Schools() {
    const [schools, setSchools] = useState<School[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSchools = async () => {
            const { data, error } = await supabase.from('schools').select('*');
            console.log("school data =>", data);
            if (error) {
                console.error('Error fetching schools:', error);
            } else {
                setSchools(data);
                setFilteredSchools(data); // Initially display all schools
            }
            setLoading(false);
        };

        fetchSchools();
    }, []);

    // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter schools by name based on search query
        const filtered = schools.filter((school) =>
            school.name.toLowerCase().includes(query)
        );
        setFilteredSchools(filtered);
    };

    if (loading) return (
        <div className='w-fit flex flex-col items-center m-auto h-screen'>
            <p>Loading...</p>
            <Spinner />
        </div>
    )

    return (
        <div>
            <h1 className='text-3xl text-center my-8 capitalize font-bold'>School Search</h1>

            {/* Search Bar */}
            <div className="flex  justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by school name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 rounded-md w-full mx-10 rounde-md lg:w-1/2"
                />
            </div>

            <ul className='flex flex-wrap gap-5 items-center justify-center'>
                {filteredSchools?.map((school) => (
                    <SchoolCard key={school.id} {...school} />
                ))}
            </ul>
        </div>
    );
}

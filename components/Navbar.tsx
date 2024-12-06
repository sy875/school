'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleSchoolRedirect = () => {
        router.push("/admin"); // Redirect to /admin page
    };

    return (
        <nav className="shadow-md mb-10 overflow-hidden">
            <div className="lg:px-5 flex justify-between items-center">
                <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="logo"
                />
                <div className="flex gap-5  items-center  px-2 lg:px-14">
                    <Link className={`font-bold hover:bg-cyan-500 px-4 py-2 rounded-md hover:text-white ${pathname == "/" && 'bg-cyan-500 text-white '}`} href={"/"}>
                        Home
                    </Link>
                    <Link className={`font-bold text-nowrap px-4 py-2 rounded-md hover:bg-cyan-500 hover:text-white  ${pathname == "/admin" && 'bg-cyan-500 text-white px-4 py-2 rounded-md'}`} href={"/admin"}>
                        Add School
                    </Link>
                  
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
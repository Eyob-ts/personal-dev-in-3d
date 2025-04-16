import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constants";
import {logo, menu, close} from "../assets";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [active, setActive] = useState("")
    const [toggle, setToggle] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            
            // Hide navbar when scrolling down, show when scrolling up
            setVisible(prevScrollPos > currentScrollPos);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return ( 
        <nav className={`
        ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-black ${!visible ? 'transform -translate-y-full' : ''}`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link to = "/"
                className="flex items-center gap-2 " 
                onClick={()=>{
                    setActive("")
                    window.scrollTo(0,0)
                }}>
                    <img src={logo} alt="logo" className="w-9 h-9 object-contain"/>
                <p className="text-white text-[18px] font-mono cursor-pointer">
                    Eyob Teshome <span className="sm:block hidden">| fullstack developer</span>
                </p>
                </Link>
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((link)=>(
                        <li key={link.id}>
                            <Link
                                className="text-white font-mono text-[16px] hover:text-secondary transition-all duration-300 ease-in-out"
                                to={link.id}
                                onClick={()=>{
                                    setActive(link.id)
                                    window.scrollTo(0,0)
                                }}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="sm:hidden flex flex-1 justify-end items-center ">
                    <img src={toggle ? menu : close} alt="menu"
                    className="w-[28px] h-[28]px object-contain cursor-pointer"
                    onClick={()=> setToggle(!toggle)}/>
                    <div className={`${toggle ? 'hidden': 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                    <ul className="list-none flex flex-col  justify-end items-start gap-4">
                    {navLinks.map((link)=>(
                        <li key={link.id}>
                            <Link
                                className="text-white text-[16px] hover:text-secondary transition-all duration-300 ease-in-out"
                                to={link.id}
                                onClick={()=>{
                                    setActive(link.id)
                                    window.scrollTo(0,0)
                                }}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                    </div>

                </div>

            </div>

        </nav>
     );
}
 
export default Navbar;
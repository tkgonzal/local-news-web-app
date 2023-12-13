import { Staff } from "../types/interfaces/Staff"

import tkImage from "../../public/assets/tk.jpg"
import liamImage from "../../public/assets/liam.png"
import jordanImage from "../../public/assets/jordan.jpg"
import dawidImage from "../../public/assets/dawid.jpg"
import ivanImage from "../../public/assets/ivan.jpg"
import missileImage from "../../public/assets/missile.jpg"
import michalaImage from "../../public/assets/michala.jpg"

const StaffData : Staff[] = [
    {
        staffName: "Traven Gonzales",
        imgSrc: tkImage,
        position: "Team Lead and Fullstack Developer",
    },
    {
        staffName: "Liam Stelly-Hawkes",
        imgSrc: liamImage,
        position: "Fullstack Developer and Crawler Developer",
    },
    {
        staffName: "Jordan Dinis",
        imgSrc: jordanImage,
        position: "Fullstack Developer",
    },
    {
        staffName: "Dawid Fourie",
        imgSrc: dawidImage,
        position: "Fullstack Developer",
    },
    {
        staffName: "Ivan Piceno",
        imgSrc: ivanImage,
        position: "Fullstack Developer",
    },
    {
        staffName: "Misael Bolainez",
        imgSrc: missileImage,
        position: "Fullstack Developer",
    },
    {
        staffName: "Michala Curran",
        imgSrc: michalaImage,
        position: "UI/UX Designer",
    },
    
]

export default StaffData


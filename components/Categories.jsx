import Pizza from "../public/assets/Pizza.png";
import Bakery from "../public/assets/Bakery (1).png";
import Burger from "../public/assets/Burgers.png";
import Dessert from "../public/assets/Dessert.png";
import Roti from "../public/assets/Indian.png";
import Soup from "../public/assets/Soup.png";
import Wings from "../public/assets/Wings.png";
import Noodles from "../public/assets/Asian.png";
import Kebabs from "../public/assets/Halal.png";
import Biryani from "../public/assets/Biryani.png";

import Image from "next/image";

const data = [
    {
        img:  Biryani,
        type: `Biryani`,
    },
    {
        img:  Pizza,
        type: `Pizza`,
    },
    {
        img:  Noodles,
        type: `Noodles`,
    },
    
    {
        img:  Burger,
        type: `Burger`,
    },
    {
        img:  Roti,
        type: `Roti`,
    },
    {
        img:  Wings,
        type: `Wings`,
    },
    {
        img:  Dessert,
        type: `Dessert`,
    },
    {
        img:  Bakery,
        type: `Bakery`,
    },
    {
        img:  Soup,
        type: `Soup`,
    },
    {
        img:  Kebabs,
        type: `Kebabs`,
    },
    
]


function Categories() {
    return (
        <div className=" px-16 sm:h-32 flex justify-center mb-10 ">
            <ul className="grid space-y-4  md:grid-cols-10 grid-cols-5 gap-4 my-auto mt-4 sm:mt-5 sm:gap-6 md:mt-5 lg:mt-1  "> 
                {data.map((d) => (
                    <li className=" space-x-1 first:my-[16px]  gap-4  h-[50px] w-[50px] sm:h-[72px] sm:w-[72px] bg-white rounded-full flex flex-col justify-center items-center border hover:border-2 hover:border-green-700" key={d.type}> 
                        <Image src={d.img} alt="" className="space-x-1 mt-7 h-10 w-10 sm:h-12 sm:w-12 sm:mt-9 md:mt-11" />
                        <div className="space-x-1 text-sm text-slate-800 font-semibold md:mt-3 sm:mt-1 ">{d.type}</div>
                    </li>
                ))}
            </ul>   

        </div>
    )
}

export default Categories

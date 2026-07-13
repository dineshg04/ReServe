
function Filter() {
    return (
        <div className="whitespace-nowrap h-14 mt-24 mb-20 flex items-center justify-center px-14 md:-mt-8 md:-mb-5 sm:mt-20 sm:mb-16 sm:px-16 lg:-mt-9 lg:-mb-11 ">
            <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:items-center md:justify-center ">
                <button className="py-2 px-4 bg-white rounded-full font-mono border border-[#D9DADB] text-black hover:bg-slate-100">Filter</button>
                <button className="py-2 px-4 bg-white rounded-full font-mono border border-[#D9DADB] text-black hover:bg-slate-100">Sort By</button>
                <button className="py-2 px-4 bg-white rounded-full font-mono border border-[#D9DADB] text-black hover:bg-slate-100">Ratings 4.0+</button>
                <button className="py-2 px-4 bg-white rounded-full font-mono border border-[#D9DADB] text-black hover:bg-slate-100">Pure veg</button>
                <button className="py-2 px-4 bg-white rounded-full font-mono border border-[#D9DADB] text-black hover:bg-slate-100">Nearby</button>
            </div>
        </div>
    )
}

export default Filter;


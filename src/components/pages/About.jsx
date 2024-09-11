import React from 'react'

function About() {
  return (
    <div>
        <div className='grid grid-cols-2 p-5  h-[90vh]'>
        <div className="img">
            <img src="/banner2.png" className='h-[31rem] w-[31rem] rounded-full' alt="" />
        </div>
        <div className="text text-[brown] mx-20 my-2">
            <h3 className="uppercase font-bold font-[lora] text-4xl py-4">about us</h3>
            <div className="font-md txt">
                <p>Welcome to <span className='font-[tangerine] font-bold text-[brown]'>BimsCollection</span>, where style meets comfort in every stitch. Founded with a passion for fashion and a commitment to quality, <span className='font-[tangerine] font-bold text-[brown]'>BimsCollection</span> brings you a curated selection of contemporary clothing that caters to your unique sense of style.

                        At <span className='font-[tangerine] font-bold text-[brown]'>BimsCollection</span>, we believe that fashion should be effortless yet expressive. Our collection is carefully curated to offer a blend of timeless classics and trendy pieces, ensuring there’s something for every occasion and every mood. Whether you’re looking for the perfect outfit for a casual day out or something chic for a special event, <span className='font-[tangerine] font-bold text-[brown]'>BimsCollection</span> has you covered.

                        Quality is at the heart of everything we do. Each garment in our collection is crafted with attention to detail and made from premium materials to ensure durability and comfort. We prioritize not only style but also sustainability, sourcing materials responsibly to minimize our environmental impact.

                        Our mission is to empower individuals to look and feel their best, no matter their personal style or size. </p>
            </div>
            {/* <div className="py-4">
                <button className='bg-[black] text-[silver] text-lg font-semibold p-[.4em] px-8 hover:bg-[grey] hover:text-[black] '>Read More</button>
            </div> */}
            <div className="icon mx-4">
                {/* come back here */}
            </div>
        </div>
      
    </div>
    </div>
  )
}

export default About
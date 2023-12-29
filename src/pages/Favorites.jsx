//import { useNavigate } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom"

const Favorites = () => {
  return(
    <div>
      <div className="flex justify-between text-white font-montserrat px-2 sm:px-6 md:px-36 py-4">
        <div className="flex border-b-2 border-[#201B21] border-opacity-60 w-[220px] md:w-[300px] lg:w-[404px] pl-2 sm:pl-4 pb-4">
          <div className="mr-6 md:mr-20">
            favorites
          </div>
          <Link 
            to={'/app/suggestions'}
            className="text-white text-opacity-60 hover:text-opacity-70">
            suggestions
          </Link>
        </div>
        <input
          type="file"
          id="fileInput"
          //onChange={handleFileInput}
          accept="image/*" // only accept image
          style={{ display: "none" }} // hide default input style
        />
        <Link
          to={"/app/create"}
          className="flex items-center bg-white bg-opacity-40 w-32 pl-8 rounded-3xl shadow-xl hover:bg-opacity-50"
        >
          create
          <IoIosAdd className="text-2xl" />
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-left mx-[120px]">
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
          <div className="bg-white bg-opacity-20 w-[270px] h-[408px] mx-[20px] my-[20px] rounded-2xl shadow-xl">
            <div className='relative w-[240px] h-[240px] bg-white rounded-2xl shadow-3xl my-[16px] mx-[15px]'>
              {/* sample content */}
              <img 
              src="https://www.thesupermade.com/cdn/shop/products/The-Supermade-Sunflower-Couple-Sports-Skate-Shoes_1_2048x2048.jpg?v=1679891170" 
              alt="uploaded img" 
              className="w-full h-full object-cover rounded-2xl"
              style={{ objectFit: "contain" }}             
              />
            </div>
            <div className='font-montserrat text-white mx-[20px] h-[107px] overflow-hidden'>
                {/* name and tag */}
                <div className='mb-2'>
                  FlowerShoe
                </div>
                <div className='text-[#EBEBF5] text-opacity-60'>
                  #sneaker #pink #graphic
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites;
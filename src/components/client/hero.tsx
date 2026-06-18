import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const Hero = () => {
    return (
      <>
        <div className="mt-5 text-white relative items-start lg:items-center gap-x-5 gap-y-11 lg:flex-row flex-col pt-6 lg:pt-3 lg:pb-3 pb-6 flex px-6 lg:px-3 justify-between h-fit lg:h-[83vh] rounded-3xl md:rounded-[28px] w-full bg-[#1f514c]">
          <AnimateOnScroll animation="fade-left" onMount delay={0.1} className="flex flex-col px-0 lg:pl-10 gap-10 md:max-w-[70%]  lg:max-w-1/2">
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex -space-x-3 items-center">
                    <div className="bg-[#fde68a] sm:w-10 flex sm:h-10 w-8 h-8 rounded-full  items-center justify-center text-sm font-medium text-gray-700 border-2 border-white shadow-sm overflow-hidden">
                      <img
                        alt=""
                        loading="lazy"
                        width="100"
                        height="0"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full object-cover bg-transparent"
                        src="/profile3.jpg"
                      />
                    </div>
                    <div className="bg-[#bfdbfe] sm:w-10 flex sm:h-10 w-8 h-8 rounded-full  items-center justify-center text-sm font-medium text-gray-700 border-2 border-white shadow-sm overflow-hidden">
                      <img
                        alt=""
                        loading="lazy"
                        width="100"
                        height="0"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full object-cover bg-transparent"
                        src="/profile1.png"
                      />
                    </div>
                    <div className="bg-[#fed7aa] sm:w-10 flex sm:h-10 w-8 h-8 rounded-full  items-center justify-center text-sm font-medium text-gray-700 border-2 border-white shadow-sm overflow-hidden">
                      <img
                        alt=""
                        loading="lazy"
                        width="100"
                        height="0"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full object-cover bg-transparent"
                        src="/profile2.png"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="sm:w-4 sm:h-4 w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788L19.6 24 12 19.897 4.4 24l1.666-8.002L0.132 9.21l8.2-1.192L12 .587z"></path>
                    </svg>
                    <svg
                      className="sm:w-4 sm:h-4 w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788L19.6 24 12 19.897 4.4 24l1.666-8.002L0.132 9.21l8.2-1.192L12 .587z"></path>
                    </svg>
                    <svg
                      className="sm:w-4 sm:h-4 w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788L19.6 24 12 19.897 4.4 24l1.666-8.002L0.132 9.21l8.2-1.192L12 .587z"></path>
                    </svg>
                    <svg
                      className="sm:w-4 sm:h-4 w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788L19.6 24 12 19.897 4.4 24l1.666-8.002L0.132 9.21l8.2-1.192L12 .587z"></path>
                    </svg>
                    <svg
                      className="sm:w-4 sm:h-4 w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788L19.6 24 12 19.897 4.4 24l1.666-8.002L0.132 9.21l8.2-1.192L12 .587z"></path>
                    </svg>
                    <p className="ml-5 pt-0.5">Rated 4.9/5</p>
                  </div>
                </div>
              </div>
              <div className="text-[45px] leading-[110%] md:leading-[100%] md:text-6xl hedvig tracking-tight">
                Stop guessing, Start stocking smart.
              </div>
              <p className="max-w-[500px] text-md sm:text-lg">
                Bloom turns campus demand data into personalised inventory
                recommendations for every vendor — so you always stock what
                students actually want.
              </p>
            </div>
            <div className="flex gap-5 flex-wrap items-center text-md">
              <a href="/login">
                <div className="bg-white gap-2 text-white py-1 pl-5 pr-1 rounded-full cursor-pointer flex justify-end items-center">
                  <p className="text-black">Try Bloom Free</p>
                  <div className="p-1.5 bg-[#1f514c] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="22px"
                      fill="#fff">
                      <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-right" onMount delay={0.25} className="lg:w-[40%]  w-full h-[450px] md:h-[400px] lg:h-full bg-[#337F74] md:rounded-[20px] rounded-[16px]">
            {/* <img
              src="/hero.png"
              alt=""
              className="w-full h-full rounded-[inherit] object-cover relative -z-10"
             /> */}
            <img
              src="/hero.png"
              alt=""
              className="w-full h-full rounded-[inherit] object-cover relative"
            />
          </AnimateOnScroll>
        </div>
      </>
    );
}

export default Hero
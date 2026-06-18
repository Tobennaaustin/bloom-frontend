import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const How = () => {
    return (
      <>
        <div
          className="py-16"
          id="howitworks">
          <div
            className="flex flex-col justify-center items-center gap-16 py-16"
            id="steps">
            <AnimateOnScroll className="flex flex-col gap-6 text-center">
              <div className="flex items-center font-medium justify-center gap-2 text-[#1f514c]">
                <div className="w-2 h-2 bg-[#1f514c] rounded-full">
                  <div className="w-2 h-2 bg-[#1f514c] rounded-full animate-ping"></div>
                </div>
                <p>How it works</p>
              </div>
              <div className="sm:text-5xl leading-[120%] text-black text-4xl max-w-[600px] hedvig">
                Three steps to smarter inventory
              </div>
              <a href="/Authentication">
                <div className="bg-[#1f514c] gap-2 text-white py-1 pl-5 pr-1 w-fit mx-auto rounded-full hidden lg:flex justify-end items-center">
                  <p>Launch store</p>
                  <div className="p-1.5 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="22px"
                      fill="#000">
                      <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
            <div className="w-full flex justify-center">
              <div className="flex justify-between items-center">
                <div className="lg:hidden flex self-stretch">
                  <div className="flex min-w-fit flex-col h-full items-center justify-center">
                    <div className="flex flex-col flex-1 overflow-hidden relative items-center gap-3 self-stretch">
                      <div
                        className="line opacity-20 h-[45px] md:h-[45px] w-[2px] overflow-hidden relative bg-[linear-gradient(180deg,_#fff_0%,_#1f514c_100%)]
                          "></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] shrink-0 relative overflow-hidden">
                        <div>01</div>
                      </div>
                      <div className="line bg-[#1f514c] opacity-20 flex-1 w-[2px] min-h-[20px] overflow-hidden relative"></div>
                    </div>
                    <div className="flex flex-col flex-1 items-center relative gap-3 self-stretch">
                      <div className="line bg-[#1f514c] opacity-20 w-[2px] h-[45px] overflow-hidden relative"></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] shrink-0 relative overflow-hidden">
                        <div>02</div>
                      </div>
                      <div className="line bg-[#1f514c] opacity-20 flex-1 w-[2px] min-h-[20px] overflow-hidden relative"></div>
                    </div>
                    <div className="flex-col flex-1 flex items-center gap-3 self-stretch">
                      <div className="line bg-[#1f514c] opacity-20 w-[2px]  h-[45px] overflow-hidden relative"></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] shrink-0 relative overflow-hidden">
                        <div>03</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col gap-y-10 lg:gap-0 flex items-center">
                  <AnimateOnScroll animation="fade-left" className="flex gap-10 items-center flex-col lg:flex-row justify-between">
                    <div className="lg:flex-1 lg:max-w-[430px] md:w-[600px] w-[85%] rounded-3xl bg-[#fafafa] h-[295px]">
                      <img
                        alt=""
                        loading="lazy"
                        width="500"
                        height="500"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full image object-cover rounded-3xl bg-transparent"
                        src="/how1.png"
                      />
                    </div>
                    <div className="lg:flex hidden flex-col h-auto overflow-hidden relative items-center gap-3 self-stretch">
                      <div className="line bg-[#1f514c] opacity-15 h-[45px] w-[2.5px] overflow-hidden relative bg-[linear-gradient(180deg, #fff 0%, #1f514c 100%)]"></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] relative overflow-hidden">
                        <div>01</div>
                      </div>
                      <div className="line bg-[#1f514c] opacity-15 flex-1 w-[2.5px] h-px overflow-hidden relative"></div>
                    </div>
                    <div className="flex justify-between gap-y-14 flex-col items-start md:max-w-[700px] w-[85%] lg:max-w-[450px] lg:flex-1">
                      <div className="flex flex-col gap-2">
                        <div className="text-[28px] font-normal tracking-tighter text-black">
                          Create Account
                        </div>
                        <p className="text-gray-700">
                          Tell Bloom about your store type and the products you
                          sell. Quick, guided, no complexity.
                        </p>
                      </div>
                      <a href="/login">
                        <div className="flex gap-2 items-center">
                          <button className="cursor-pointer">Start now</button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#000">
                            <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="fade-right" className="flex gap-10 items-center lg:flex-row flex-col-reverse justify-between">
                    <div className="flex justify-between gap-y-14 flex-col items-start w-[85%] md:max-w-[700px] lg:max-w-[410px]">
                      <div className="flex flex-col gap-2">
                        <div className="text-[28px] font-normal tracking-tighter text-black">
                          Bloom Analyses Your Store
                        </div>
                        <p className="text-gray-700">
                          Our engine matches your store profile against campus
                          demand data from 465 students and 7 vendors
                        </p>
                      </div>
                      <a href="/login">
                        <div className="flex gap-2 items-center">
                          <button className="cursor-pointer">Start now</button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#000">
                            <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                    <div className="lg:flex hidden flex-col items-center relative  gap-3 self-stretch">
                      <div className="line bg-[#1f514c] opacity-15 w-[2.5px] h-[45px] overflow-hidden relative"></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] relative overflow-hidden">
                        <div>02</div>
                      </div>
                      <div className="line bg-[#1f514c] opacity-15 flex-1 w-[2.5px] h-px overflow-hidden relative"></div>
                    </div>
                    <div className="lg:flex-1 lg:max-w-[430px] md:w-[600px] w-[85%] rounded-3xl bg-[#fafafa] h-[295px] border-none">
                      <img
                        alt=""
                        loading="lazy"
                        width="500"
                        height="500"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full object-cover image rounded-3xl bg-transparent"
                        src="/how3.png"
                      />
                    </div>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="fade-left" className="flex gap-10 items-center flex-col lg:flex-row justify-between">
                    <div className="lg:w-[430px] md:w-[600px] w-[85%]  rounded-3xl bg-[#fafafa] h-[295px] border-none">
                      <img
                        alt=""
                        loading="lazy"
                        width="500"
                        height="500"
                        decoding="async"
                        data-nimg="1"
                        className="w-full h-full object-cover image rounded-3xl bg-transparent"
                        src="/how2.png"
                      />
                    </div>
                    <div className="flex-col h-[295px] lg:flex hidden  items-center gap-3 self-stretch">
                      <div className="line bg-[#1f514c] opacity-15 w-[2.5px] h-[45px] overflow-hidden relative"></div>
                      <div className="dot flex items-center bg-[#1f514c] text-white justify-center rounded-full w-[30px] h-[30px] relative overflow-hidden">
                        <div>03</div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-y-14 flex-col items-start md:max-w-[700px] w-[85%] lg:max-w-[450px]">
                      <div className="flex flex-col gap-2">
                        <div className="text-[28px] font-normal tracking-tighter text-black">
                          Get Your Report
                        </div>
                        <p className="text-gray-700">
                          See your personalised dashboard: top products, restock
                          alerts, and items to add or remove.
                        </p>
                      </div>
                      <a href="/login">
                        <div className="flex gap-2 items-center">
                          <button className="cursor-pointer">Start now</button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#000">
                            <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </AnimateOnScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default How
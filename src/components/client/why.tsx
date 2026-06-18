import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const Why = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center gap-16 py-16">
          <AnimateOnScroll className="flex flex-col gap-6 text-center">
            <div className="flex items-center font-medium justify-center gap-2 text-[#1f514c]">
              <div className="w-2 h-2 bg-[#1f514c] rounded-full">
                <div className="w-2 h-2 bg-[#1f514c] rounded-full animate-ping"></div>
              </div>
              <p className="text-sm">Why choose us</p>
            </div>
            <div className="sm:text-5xl leading-[120%] text-4xl max-w-[600px] hedvig text-black">
              How Bloom transforms campus inventory.
            </div>
          </AnimateOnScroll>
          <div className="w-full flex justify-center">
            <AnimateOnScroll animation="scale" delay={0.1} className="bg-linear-to-r from-[#fdfffc] p-1.5 via-[#edffe393] to-[#edffe3] flex justify-start md:flex-row flex-col w-full lg:w-[1000px] border-[#0000000d] rounded-[38px] md:justify-evenly h-fit md:h-fit border">
              <div className="flex flex-col gap-11 p-[34px] relative h-full items-start">
                <div className="text-2xl font-normal">Other Stores</div>
                <div className="flex flex-row gap-11">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#fafafa] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#1f514c">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Guesswork Stocking
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Vendors decide what to buy based on intuition and past
                        experience, not actual demand.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#fafafa] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#1f514c">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Expired and Slow-Moving Goods
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Products remain on shelves for too long, leading to
                        waste and loss of capital.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#fafafa] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#1f514c">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Frequent Stock-Outs
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Fast-selling items like water and bread finish
                        unexpectedly before restocking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-11 p-[34px] bg-[white] rounded-4xl relative h-full items-start shadow-[0_0_55px_#00000008]">
                <div className="text-2xl font-normal">With Bloom</div>
                <div className="flex flex-row gap-11">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#1f514c] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#fff">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Data-Driven Stock Decisions
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Bloom uses real student demand data to guide vendors on
                        what products to stock.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#1f514c] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#fff">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Optimal Quantity Recommendations
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Vendors know the exact number of units to buy to avoid
                        overstocking or waste.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[#1f514c] h-7 w-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#fff">
                            <path d="M404.67-406.67 650-652q9.67-9.67 23.33-9.67 13.67 0 23.34 9.67 9.66 9.67 9.66 23.33 0 13.67-9.66 23.34L428-336.67q-10 10-23.33 10-13.34 0-23.34-10L272.67-445.33Q263-455 263-468.67q0-13.66 9.67-23.33 9.66-9.67 23.33-9.67 13.67 0 23.33 9.67l85.34 85.33Z"></path>
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-[#1f514c]">
                          Smart Restock Alerts
                        </p>
                      </div>
                      <p className="pl-10 pt-2 text-[15px] text-gray-600 leading-relaxed">
                        Bloom notifies vendors at the right time to restock
                        before products run out.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </>
    );
}


export default Why
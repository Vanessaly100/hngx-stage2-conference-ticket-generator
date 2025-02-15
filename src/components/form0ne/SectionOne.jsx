import { Link } from "react-router-dom";
import { useState, useEffect, useMemo,useRef } from "react";
import { tickets } from "./Tickets";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SectionOne = () => {
  const [pickedTicket, setPickedTicket] = useState("Free");
  const [numTickets, setNumTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const ticketPrices = useMemo(
    () => ({
      Free: 0,
      VVIP: 150,
      VIP: 50,
    }),
    []
  );

  useEffect(() => {
    if (pickedTicket) {
      setTotalPrice(ticketPrices[pickedTicket] * numTickets);
    }
  }, [pickedTicket, numTickets, ticketPrices]);

  const handleTicketSelect = (ticketType) => {
    setPickedTicket(ticketType);
  };

  const handleNumChange = (e) => {
    setNumTickets(Number(e.target.value));
  };

  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault();
    if (!pickedTicket || !numTickets || numTickets <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Selection",
        text: "Please select a ticket type and enter a valid quantity.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    let existingTickets = JSON.parse(localStorage.getItem("ticketData")) || [];

    if (!Array.isArray(existingTickets)) {
      existingTickets = [];
    }

    const newTicket = {
      pickedTicket,
      numTickets,
      totalPrice,
    };

    existingTickets.push(newTicket);

    localStorage.setItem("ticketData", JSON.stringify(existingTickets));

    console.log("Updated ticket data:", existingTickets);

    Swal.fire({
      icon: "success",
      title: "Ticket Added",
      text: "Your ticket has been successfully saved!",
      confirmButtonColor: "#23a0b5",
    }).then(() => {
      setPickedTicket("Free"); 
      setNumTickets(0);
      setTotalPrice(0);
      navigate("/attendeedetails");
    });
  };
 ;
 
  const handleCancel = () => {
    setPickedTicket("Free");
    setNumTickets(0);
    setTotalPrice(0);
  };
  ;
  // Refs for keyboard navigation
  const numTicketsRef = useRef(null);
  const submitBtnRef = useRef(null);

  return (
    <div>
      <main
        className="pt-[76px] mt-8 flex flex-col justify-center items-center pb-[112px]"
        style={{
          background:
            "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D",
        }}
      >
        <div className="lg:h-[858px] h-fit  lg:p-12 p-6 bg-MainBackgroundColor2 rounded-[40px] border border-MainBackgroundColorBorder flex-col justify-center items-center gap-8 flex lg:w-[700px] mx-auto w-[90%]">
          <div className="self-stretch lg:h-12 h-fit flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-center gap-4 flex">
                <h1 className="self-stretch text-white lg:text-[32px] text-2xl font-normal font-['JejuMyeongjo']">
                  Ticket Selection
                </h1>
              </div>
              <div className="text-neutral-50 text-base font-normal font-['Roboto'] leading-normal">
                Step 1/3
              </div>
            </div>
            <div className="w-full bg-MainBackgroundColorBorder grid grid-cols-3">
              <div className="lg:h-[3px] bg-AddedColor"></div>
              <div className="h-[3px]"></div>
              <div className="h-[3px]"></div>
            </div>
          </div>
          <div className="self-stretch lg:h-[682px] h-fit p-6 bg-MainBackgroundColor3 rounded-[32px] border border-MainBackgroundColorBorder flex-col justify-center items-start gap-8 flex w-full mx-auto">
            <div
              className="self-stretch lg:h-[200px] lg:w-[556px] w-full mx-auto h-fit p-6 flex-col justify-start items-center gap-2 flex rounded-3xl border-l-2 border-r-2 border-b-2 border-[#07373F]"
              style={{
                background:
                  "radial-gradient(57.42% 106.59% at 14.02% 32.06%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), rgba(10, 12, 17, 0.10)",
                backdropFilter: "blur(7px)",
                WebkitBackdropFilter: "blur(7px)",
              }}
            >
              <div className="self-stretch h-fit flex-col justify-center items-center gap-2 flex">
                <h1 className=" h-[62px]self-stretch text-center text-neutral-50 lg:text-[62px] md:text-4xl text-2xl font-normal font-roadRage leading-[62px]">
                  Techember Fest ”25
                </h1>
                <p className="lg:w-[340px] w-11/12 mx-auto text-center text-neutral-50 lg:text-base text-sm font-normal font-roboto leading-normal ">
                  Join us for an unforgettable experience at [Event Name]!
                  Secure your spot now.
                </p>

                <div className="justify-start items-start gap-4 inline-flex lg:flex-row flex-col">
                  <div className="text-neutral-50 text-base font-normal font-roboto leading-normal">
                    📍 [Event Location]
                  </div>
                  <div className="text-neutral-50 text-base font-normal font-roboto leading-normal lg:flex hidden">
                    | |
                  </div>
                  <div className="text-neutral-50 text-base font-normal font-roboto leading-normal text-center">
                    March 15, 2025 | 7:00 PM
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

            <div className="lg:w-[556px] w-full mx-auto bg-MainBackgroundColorBorder h-[3px]">
              <div className="h-[3px]"></div>
            </div>
            {/*  */}
            <div className="self-stretch  h-fit flex-col justify-start items-start gap-2 flex lg:w-[556px] w-full mx-auto">
              <div className="self-stretch text-neutral-50 text-base font-normal font-roboto leading-normal">
                <label htmlFor="Ticket-Type">Select Ticket Type:</label>
              </div>
              <div className="self-stretch lg:h-[142px] h-full   bg-[#052228] rounded-3xl border border-[#07373F] flex-col justify-center items-center gap-4 flex w-full">
                {/*  */}

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-4 w-full  lg:h-[142px] h-full lg:w-[556p] mx-auto items-center justify-evenly self-stretch font-roboto">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.type}
                      className="cursor-pointer"
                      onClick={() => setPickedTicket(ticket.type)}
                    >
                      <input
                        type="radio"
                        name="ticketOptions"
                        value={ticket.type}
                        checked={pickedTicket === ticket.type}
                        onChange={() => setPickedTicket(ticket.type)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        numTicketsRef.current.focus();
                      }
                    }}
                        className="hidden"
                      />
                      <div
                        className={`w-[158p] h-[110p] flex flex-col items-start justify-center self-stretch rounded-xl text-white text-sm font-bold font-roboto p-3 transition-all duration-300 border ${
                          pickedTicket === ticket.type
                            ? "border-4 border-[#197686] bg-[#12464E] shadow-lg"
                            : "border-[#197686]"
                        }`}
                      >
                        <div className="text-xl font-semibold">
                          {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                        </div>
                        <div className=" text-sm uppercase leading-normal font-normal">
                          {ticket.access}
                        </div>
                        <div className="text-sm font-normal leading-[21px]">
                          {ticket.left} / 52
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="self-stretch lg:h-20 h-fit flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch text-neutral-50 text-base font-normal font-roboto leading-normal">
                  Number of Tickets
                </div>
                <div className="self-stretch  rounded-xl border border-[#07373F] justify-start items-center gap-2 inline-flex">
                  <select
                    value={numTickets}
                    onChange={handleNumChange}
                    id="number"
                     ref={numTicketsRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitBtnRef.current.focus();
                }
              }}
                    className="p-3 rounded-xl border bg-transparent outline-none border-[#07373F] text-white w-full cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/*  */}
              {/* Total Price */}
              <div className="text-white text-lg">
                Total Price: ${totalPrice.toFixed(2)}
              </div>
              {/*  */}

              <div className="self-stretch justify-center items-center lg:gap-8 gap-4 inline-flex flex-col lg:flex-row-reverse lg:w-[556px] w-full mx-auto lg:h-[48px] h-full">
                {/* Next Button */}
                <Link
                  type="submit"
                  id="submitBtn"
                  onClick={handleNext}
                  ref={submitBtnRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
                  className="self-stretch grow shrink basis-0 lg:h-12 h-fit px-6 py-3 bg-[#23a0b5] rounded-lg justify-center items-center gap-2 flex text-white text-base"
                >
                  Next
                </Link>

                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="self-stretch grow shrink basis-0 lg:h-12 h-fit px-6 py-3 rounded-lg border border-[#23a0b5] justify-center items-center gap-2 flex text-[#23a0b5] text-base font-normal font-jeju leading-normal"
                >
                  Cancel
                </button>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionOne;

import { useState, useEffect } from "react";

const MyTickets = () => {
  const [ticketHistory, setTicketHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("ticketHistory")) || [];
    setTicketHistory(storedHistory);
  }, []);

  const handleClearTicket = () => {
  localStorage.removeItem("ticketHistory"); 
  setTicketHistory([]); 
};

  return (
    <div>
      <section className="bg-MainBackgroundColor3 text-white h-fit pt-[80px]">
        <h1 className="text-xl font-bold py-8 text-center text-[2.5rem]">
          My Ticket History
        </h1>
        <div className="grid lg:grid-cols-4  gap-4 w-[95%] mx-auto">
          {ticketHistory.length > 0 ? (
            ticketHistory.map((ticket, index) => (
              <div
                key={index}
                className="bg-[#23a0b5] text-white p-4 mb-4 rounded shadow"
              >
                {ticket.imageUrl && (
                  <img
                    src={ticket.imageUrl}
                    alt="Ticket Image"
                    className="w-full lg:h-40 md:h-[50%] object-cover rounded-md h-fit"
                  />
                )}
                <p>
                  <strong>Name:</strong> {ticket.name}
                </p>
                <p>
                  <strong>Email:</strong> {ticket.email}
                </p>
                <p>
                  <strong>Ticket Type:</strong> {ticket.pickedTicket}
                </p>
                <p>
                  <strong>Number Of Ticket:</strong> {ticket.numTickets}
                </p>
                <p>
                  <strong>Total Price:</strong>$ {ticket.totalPrice}
                </p>
                <p>
                  <strong>Special Request:</strong> {ticket.message}
                </p>
              </div>
            ))
          ) : (
            <p>No ticket history found.</p>
          )}
        </div>
        <button onClick={handleClearTicket} className="bg-red-500 px-4 py-2 rounded mt-4">
            Clear Ticket
          </button>
      </section>
    </div>
  );
};

export default MyTickets;

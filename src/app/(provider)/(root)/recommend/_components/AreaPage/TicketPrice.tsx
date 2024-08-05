type TicketPrice = {
  ticket_price: {
    adult?: string;
    child?: string;
    youth?: "string";
    average_meal_cost?: string;
    average_nightly_rate?: string;
  } | null;
  type: string;
};

function TicketPrice({ ticket_price, type }: TicketPrice) {
  if (type === "place" && ticket_price) {
    return (
      <>
        <p>성인 {ticket_price.adult}</p>
        <p>청년 {ticket_price.youth}</p>
        <p>어린이 {ticket_price.child}</p>
      </>
    );
  }

  if (type === "restaurant" && ticket_price) {
    return <p>{ticket_price.average_meal_cost}</p>;
  }

  if (type === "accommodation" && ticket_price) {
    return <p>{ticket_price.average_nightly_rate}</p>;
  }

  return <p>Enjoy For Free</p>;
}

export default TicketPrice;

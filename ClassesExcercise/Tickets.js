function logTickets(ticketsInfo, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = +price;
            this.status = status;
        }
    }
    let tickets = [];

    ticketsInfo
        .forEach(line => {
            let [destination, price, status] = line
                .split("|");

            let ticket = new Ticket(destination, price, status);

            tickets.push(ticket);
        });

    if (criteria === "destination") {
        return tickets
            .sort((a, b) => a.destination.localeCompare(b.destination));
    } else if (criteria === "price") {
        return tickets
            .sort((a, b) => a - b);
    } else if (criteria === "status") {
        return tickets
            .sort((a, b) => a.status.localeCompare(b.status));
    }
}
import { useEffect, useState, useLayoutEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import auth from "../utils/auth";
import AuthChecker from "../components/AuthChecker";

const boardStates = ["Todo", "In Progress", "Done"];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [sortOption, setSortOption] = useState<string>("name");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  const sortTickets = (tickets: TicketData[], sortOption: string) => {
    switch (sortOption) {
      case "name":
        return tickets.sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? "")
        );
      case "id":
        return tickets.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      default:
        return tickets;
    }
  };

  const filterTickets = (tickets: TicketData[], searchTerm: string) => {
    if (!searchTerm) {
      return tickets;
    }

    return tickets.filter(
      (ticket) =>
        (ticket.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.description ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <AuthChecker />
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>

          <div className="sort-filter-options">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="name">Name</option>
              <option value="id">ID</option>
            </select>

            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="board-display">
            {boardStates.map((status) => {
              let filteredTickets = tickets.filter(
                (ticket) => ticket.status === status
              );
              filteredTickets = filterTickets(filteredTickets, searchTerm);
              filteredTickets = sortTickets(filteredTickets, sortOption);
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;

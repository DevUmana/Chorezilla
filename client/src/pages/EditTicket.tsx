import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { retrieveTicket, updateTicket } from "../api/ticketAPI";
import { TicketData } from "../interfaces/TicketData";
import auth from "../utils/auth";
import AuthChecker from "../components/AuthChecker";

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchTicket = async (ticketId: number) => {
    try {
      setLoading(true);
      const data = await retrieveTicket(ticketId);
      setTicket(data);
    } catch (err) {
      console.error("Failed to retrieve ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    auth.redirectIfNotLoggedIn(navigate);
    if (state?.id) {
      fetchTicket(state.id);
    } else {
      console.error("No ticket ID found in state");
    }
  }, [state]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null && ticket.name) {
      try {
        await updateTicket(ticket.id, ticket);
        navigate("/"); // Navigate only if update is successful
      } catch (err) {
        console.error("Failed to update ticket:", err);
      }
    } else {
      console.error("Ticket data is undefined.");
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <AuthChecker />
      <div className="container">
        {loading ? (
          <div>Loading ticket data...</div> // Show loading message
        ) : ticket ? (
          <form className="form" onSubmit={handleSubmit}>
            <h1>Edit Ticket</h1>
            <label htmlFor="tName">Ticket Name</label>
            <textarea
              id="tName"
              name="name"
              value={ticket.name || ""}
              onChange={handleTextAreaChange}
            />
            <label htmlFor="tStatus">Ticket Status</label>
            <select
              name="status"
              id="tStatus"
              value={ticket.status || ""}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <label htmlFor="tDescription">Ticket Description</label>
            <textarea
              id="tDescription"
              name="description"
              value={ticket.description || ""}
              onChange={handleTextAreaChange}
            />
            <button type="submit">Submit Form</button>
          </form>
        ) : (
          <div>Issues fetching ticket</div>
        )}
      </div>
    </>
  );
};

export default EditTicket;

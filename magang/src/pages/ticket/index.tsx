import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { MusicFeastBackground } from "../../components/musicfeast-background";
import "./ticket.css";

type Ticket = {
  code: string;
  type: string;
  quantity: number;
  total: number;
  purchaseDate: string;
  status: "Active" | "Used" | "Expired";
};

type Purchase = {
  transactionCode: string;
  quantity: number;
  total: number;
  purchaseDate: string;
  status: "Success" | "Pending" | "Failed";
};

const activeTickets: Ticket[] = [
  {
    code: "MF-8K29-XP41",
    type: "VIP",
    quantity: 2,
    total: 750000,
    purchaseDate: "24 September 2026",
    status: "Active",
  },
  {
    code: "MF-4L72-QA18",
    type: "Regular",
    quantity: 1,
    total: 250000,
    purchaseDate: "18 September 2026",
    status: "Active",
  },
];

const purchaseHistory: Purchase[] = [
  {
    transactionCode: "TRX-2026-0924-001",
    quantity: 2,
    total: 750000,
    purchaseDate: "24 September 2026",
    status: "Success",
  },
  {
    transactionCode: "TRX-2026-0918-002",
    quantity: 1,
    total: 250000,
    purchaseDate: "18 September 2026",
    status: "Success",
  },
  {
    transactionCode: "TRX-2026-0902-003",
    quantity: 3,
    total: 900000,
    purchaseDate: "2 September 2026",
    status: "Success",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const Ticket = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const totalTickets = activeTickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0,
  );

  const activeTicketCount = activeTickets.filter(
    (ticket) => ticket.status === "Active",
  ).length;

  const usedTicketCount = activeTickets.filter(
    (ticket) => ticket.status === "Used",
  ).length;

  return (
    <MusicFeastBackground>
      <div className="ticket-page">
        <Navbar />

        <main className="ticket-main">
          <section className="ticket-hero">
            <div className="ticket-hero-label">
              <span />
              MY TICKETS
              <span />
            </div>

            <div className="ticket-hero-content">
              <div>
                <p className="ticket-kicker">YOUR MUSICFEAST JOURNEY</p>

                <h1>
                  My <span>Tickets</span>
                </h1>

                <p className="ticket-hero-description">
                  Manage your tickets, check their status, and view your
                  purchase history in one place.
                </p>
              </div>

              <div className="ticket-hero-symbol">
                <div className="ticket-symbol-ring ticket-symbol-ring-one" />
                <div className="ticket-symbol-ring ticket-symbol-ring-two" />
                <span>♫</span>
              </div>
            </div>
          </section>

          <section className="ticket-summary">
            <article className="ticket-summary-card">
              <div className="ticket-summary-icon">♧</div>

              <div>
                <span>Total Tickets</span>
                <strong>{totalTickets}</strong>
              </div>
            </article>

            <article className="ticket-summary-card ticket-summary-active">
              <div className="ticket-summary-icon">✦</div>

              <div>
                <span>Active Tickets</span>
                <strong>{activeTicketCount}</strong>
              </div>
            </article>

            <article className="ticket-summary-card">
              <div className="ticket-summary-icon">✓</div>

              <div>
                <span>Used Tickets</span>
                <strong>{usedTicketCount}</strong>
              </div>
            </article>
          </section>

          <section className="ticket-section">
            <div className="ticket-section-heading">
              <div>
                <span className="ticket-section-number">01</span>

                <div>
                  <p>YOUR COLLECTION</p>
                  <h2>Active Tickets</h2>
                </div>
              </div>

              <span className="ticket-section-count">
                {activeTicketCount} active
              </span>
            </div>

            {activeTickets.length > 0 ? (
              <div className="ticket-list">
                {activeTickets.map((ticket) => (
                  <article className="ticket-card" key={ticket.code}>
                    <div className="ticket-card-left">
                      <div className="ticket-card-icon">
                        <span>♫</span>
                      </div>

                      <div className="ticket-card-main">
                        <span className="ticket-card-label">TICKET CODE</span>

                        <strong className="ticket-code">{ticket.code}</strong>

                        <div className="ticket-card-details">
                          <div>
                            <span>Ticket Type</span>
                            <strong>{ticket.type}</strong>
                          </div>

                          <div>
                            <span>Quantity</span>
                            <strong>{ticket.quantity} Ticket</strong>
                          </div>

                          <div>
                            <span>Purchase Date</span>
                            <strong>{ticket.purchaseDate}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-card-right">
                      <div className="ticket-card-price">
                        <span>Total Payment</span>
                        <strong>{formatPrice(ticket.total)}</strong>
                      </div>

                      <span className="ticket-status ticket-status-active">
                        <span />
                        {ticket.status}
                      </span>

                      <button
                        type="button"
                        className="ticket-view-button"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        View Ticket
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ticket-empty">
                <span>♫</span>
                <h3>No active tickets</h3>
                <p>You don't have any active tickets at the moment.</p>
              </div>
            )}
          </section>

          <section className="ticket-section ticket-history-section">
            <div className="ticket-section-heading">
              <div>
                <span className="ticket-section-number">02</span>

                <div>
                  <p>TRANSACTION RECORD</p>
                  <h2>Purchase History</h2>
                </div>
              </div>

              <span className="ticket-section-count">
                {purchaseHistory.length} transactions
              </span>
            </div>

            <div className="ticket-history">
              <div className="ticket-history-header">
                <span>Transaction</span>
                <span>Tickets</span>
                <span>Total</span>
                <span>Date</span>
                <span>Status</span>
              </div>

              {purchaseHistory.map((purchase) => (
                <div
                  className="ticket-history-row"
                  key={purchase.transactionCode}
                >
                  <div>
                    <span className="ticket-mobile-label">Transaction</span>
                    <strong>{purchase.transactionCode}</strong>
                  </div>

                  <div>
                    <span className="ticket-mobile-label">Tickets</span>
                    <strong>{purchase.quantity}</strong>
                  </div>

                  <div>
                    <span className="ticket-mobile-label">Total</span>
                    <strong>{formatPrice(purchase.total)}</strong>
                  </div>

                  <div>
                    <span className="ticket-mobile-label">Date</span>
                    <strong>{purchase.purchaseDate}</strong>
                  </div>

                  <div>
                    <span className="ticket-mobile-label">Status</span>
                    <span className="ticket-history-status">
                      <span />
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />

        {selectedTicket && (
          <div
            className="ticket-modal-overlay"
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className="ticket-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="ticket-modal-close"
                onClick={() => setSelectedTicket(null)}
              >
                ×
              </button>

              <div className="ticket-modal-top">
                <span className="ticket-modal-label">MUSICFEAST TICKET</span>

                <div className="ticket-modal-icon">♫</div>

                <h2>Your Ticket</h2>

                <p>
                  Keep this ticket ready when you need to access your purchase.
                </p>
              </div>

              <div className="ticket-modal-code">
                <span>Ticket Code</span>
                <strong>{selectedTicket.code}</strong>
              </div>

              <div className="ticket-qr">
                <div className="ticket-qr-pattern">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="ticket-modal-details">
                <div>
                  <span>Ticket Type</span>
                  <strong>{selectedTicket.type}</strong>
                </div>

                <div>
                  <span>Quantity</span>
                  <strong>{selectedTicket.quantity}</strong>
                </div>

                <div>
                  <span>Purchase Date</span>
                  <strong>{selectedTicket.purchaseDate}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{formatPrice(selectedTicket.total)}</strong>
                </div>
              </div>

              <div className="ticket-modal-status">
                <span />
                Ticket Active
              </div>
            </div>
          </div>
        )}
      </div>
    </MusicFeastBackground>
  );
};

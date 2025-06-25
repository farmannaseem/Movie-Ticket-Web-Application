import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import {
  SelectionContainer,
  SelectionContent,
  MovieDetails,
  BookingForm
} from './styles/Selection.styles';
import { Ticket } from '../types/types';

export default function Selection() {
  const navigate = useNavigate();
  const { selectedMovie, addTicket, user } = useApp();
  const [loading, setLoading] = useState(false);
  
  const [ticketCount, setTicketCount] = useState(1);
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/booking');
    }
  }, [selectedMovie, navigate]);

  if (!selectedMovie) {
    return null;
  }

  const pricePerTicket = 25;
  const totalPrice = ticketCount * pricePerTicket;

  const handleBooking = async () => {
    setLoading(true);
    
    const newTicket: Ticket = {
      id: Date.now(),
      movieId: selectedMovie?.id || 0,
      userId: user.username,
      movieName: selectedMovie?.name || '',
      ticketCount: ticketCount,
      time: time,
      date: date,
      amount: ticketCount * 25,
      seatNumber: 'A1', // Example seat number
      newTicket: true // Example flag for new ticket
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addTicket(newTicket);
    toast.success('Tickets Booked Successfully!');
    setLoading(false);
    navigate('/activity');
  };

  return (
    <SelectionContainer>
      <SelectionContent>
        <MovieDetails>
          <div className="poster">
            <img src={selectedMovie.image} alt={selectedMovie.name} />
          </div>
          <div className="info">
            <h2>{selectedMovie.name}</h2>
            <span className="year">{selectedMovie.year}</span>
          </div>
        </MovieDetails>

        <BookingForm>
          <h3 className="form-title">Book Tickets</h3>
          
          <div className="form-group">
            <label>
              <FiUsers /> Number of Tickets
            </label>
            <input
              type="number"
              min="1"
              value={ticketCount}
              onChange={(e) => setTicketCount(parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>
              <FiClock /> Show Time
            </label>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="12:00">12:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FiCalendar /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span className="label">Price per ticket</span>
              <span className="value">${pricePerTicket}</span>
            </div>
            <div className="price-row">
              <span className="label">Number of tickets</span>
              <span className="value">{ticketCount}</span>
            </div>
            <div className="price-row total">
              <span className="label">Total Amount</span>
              <span className="value">${totalPrice}</span>
            </div>
          </div>

          <button 
            onClick={handleBooking} 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loader" />
                Booking...
              </>
            ) : (
              'Book Tickets'
            )}
          </button>
        </BookingForm>
      </SelectionContent>
    </SelectionContainer>
  );
} 
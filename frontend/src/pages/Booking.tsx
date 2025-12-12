import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import api from '../client'; // make sure src/client.ts or src/client.js exists and exports axios instance

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<any>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadShow = async () => {
    try {
      const res = await api.get(`/shows/${id}`);
      setShow(res.data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to load show details');
    }
  };

  const toggleSeat = (num: number) => {
    const booked = show?.booked_seats || [];
    if (booked.includes(num)) return;
    setSelected(prev => prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]);
  };

  const confirmBooking = async () => {
    if (selected.length === 0) {
      setError('Pick at least one seat');
      return;
    }
    setBooking(true);
    setError('');
    try {
      await api.post('/book', {
        show_id: Number(id),
        seats: selected,
      });
      // success: refresh show and clear selection
      setSelected([]);
      await loadShow();
      alert('Booking successful');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (!show) return <div className="text-white p-8">Loading show...</div>;

  const totalSeats = show.total_seats ?? 40;
  const booked = show.booked_seats ?? [];

  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Booking — {show.name}</h1>

      {error && <div className="mb-4 p-3 rounded bg-red-700 text-white">{error}</div>}

      <motion.div layout className="grid grid-cols-8 gap-3 p-6 bg-white/5 rounded-lg">
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map(num => {
          const isBooked = booked.includes(num);
          const isSelected = selected.includes(num);

          return (
            <motion.div
              key={num}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSeat(num)}
              className={clsx(
                'w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer font-semibold select-none transition-all border',
                {
                  'bg-red-600 text-white border-red-400 opacity-80 cursor-not-allowed': isBooked,
                  'bg-purple-600 text-white border-purple-300 shadow-lg': isSelected,
                  'bg-slate-900 border-slate-700 hover:border-purple-300': !isBooked && !isSelected,
                }
              )}
            >
              {num}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 text-center">
        <button
          onClick={confirmBooking}
          disabled={booking}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-60"
        >
          {booking ? 'Booking...' : `Confirm (${selected.length})`}
        </button>
      </div>
    </div>
  );
}

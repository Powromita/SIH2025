import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Connect to backend

const TrackProgress = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = 'extract-user-id-from-token'; // Parse user ID from token or backend
      socket.emit('joinRoom', userId); // Join user room

      // Fetch initial reports
      axios.get('/api/reports/my', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setReports(res.data));

      // Real-time update
      socket.on('reportUpdate', (updatedReport) => {
        setReports(prev => prev.map(r => r._id === updatedReport._id ? updatedReport : r));
      });

      socket.on('notification', (notification) => {
        alert(notification.message); // Or use toast
      });

      return () => {
        socket.off('reportUpdate');
        socket.off('notification');
      };
    }
  }, []);

  return (
    <div>
      {reports.map(report => (
        <div key={report._id}>
          <p>{report.description} - Status: {report.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TrackProgress;
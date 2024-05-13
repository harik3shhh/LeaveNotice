import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"
import { useAuth } from '../context/auth';
import {useNavigate} from "react-router-dom"

const LeaveRequestForm = () => {
  const navigate = useNavigate()
  const [auth] = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!auth.token) {
        navigate("/login");
    }
}, [auth.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!auth.token) {
        return navigate("/login");// Exit the function if token is not present
      }

      const config={
        headers: {
          Authorization: `${auth.token}`
        }
      };

      console.log(config);

      await axios.post('https://leave-notice-backend.vercel.app/api/student/leave-request',  { startDate, endDate, reason }, config);
      toast.success('Leave request submitted successfully');
      setStartDate("")
      setEndDate("")
      setReason("")
      // Add logic to redirect or show success message
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit leave request');
    }
  };

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {!auth.token && <h1>PLEASE LOGIN BEFORE SUBMITTING THE LEAVE REQUEST</h1>}
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            Leave Request Form
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" className="form-control" id="startDate" name="startDate" required
                  value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input type="date" className="form-control" id="endDate" name="endDate" required
                  value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason:</label>
                <textarea className="form-control" id="reason" name="reason" rows="3" required
                  value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeaveRequestForm;

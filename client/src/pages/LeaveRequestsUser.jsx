import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import {useNavigate} from "react-router-dom"

const LeaveRequestsUser = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([]);
  const [auth] = useAuth();

  const getData = async () => {
    try {
      if (!auth.token) {
        return navigate("/login");// Exit the function if token is not present
      }
  
      const config = {
        headers: {
          Authorization: `${auth.token}`
        }
      };
  
      console.log(config);
  
      const { data } = await axios.get("https://leave-notice-backend.vercel.app/api/student/myrequest", config);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [auth?.token]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '80vw' }}>
        <div className="card-header">
          <h1 className="card-title">My Leave Requests</h1>
        </div>
        <div className="card-body">
          {requests.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td>{auth.user.name}</td>
                      <td>{new Date(request.startDate).toLocaleDateString()}</td>
                      <td>{new Date(request.endDate).toLocaleDateString()}</td>
                      <td>{request.reason}</td>
                      <td style={{ color: request.status === 'pending' || request.status === 'rejected' ? 'red' : 'green' }}>
                        {request.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsUser;

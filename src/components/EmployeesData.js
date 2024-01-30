import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import "../css/employeeStyles.css";
import io from 'socket.io-client';
import axios from 'axios';

function EmployeeData({employees}) {
  
  return (
    <div className="listContainer">
      <ul className="scrollableList">
        {employees.map((employee) => (
          <li key={employee.id}>
            <div className="employee-item">
              {/* <p>Employee ID: {employee.userId}</p> */}
              <p>Employee Name: {employee.name}</p>
              <p>Email: {employee.email}</p>
              {/* <p>Contact Number: {employee.phoneNumber}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeData;

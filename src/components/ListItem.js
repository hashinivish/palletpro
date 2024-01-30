import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import '../css/listItemStyles.css';
import axios from 'axios';
import io from 'socket.io-client';


function ListItem({palletJacks}) {
  

  // useEffect(() => {
  //   const socket = io(API_BASE_URL);

  //   socket.on('palletJacks', (data) => {
  //     setPalletJacks(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  
  return (
    <div className="">
      <ul className="">
        {Array.isArray(palletJacks)
          ? palletJacks.map((jack) => (
              <li key={jack.id}>
                <div className={jack.obstacle == "Path is clear" ? "jack-item-1" : "jack-item-2"}>
                <table>
                  <tbody>
                    {/* <tr>
                      <td>Pallet ID &nbsp;</td>
                      <td>- &nbsp; {jack.palletId}</td>
                    </tr> */}
                    <tr>
                      <td>Status &nbsp;</td>
                      <td>- &nbsp; {jack.active}</td>
                    </tr>
                    <tr>
                      <td>Location &nbsp;</td>
                      <td>- &nbsp; {jack.location}</td>
                    </tr>
                    <tr>
                      <td>Obstacle &nbsp;</td>
                      <td>- &nbsp; {jack.obstacle}</td>
                    </tr>
                    <tr>
                      <td>Current Weight &nbsp;</td>
                      <td>- &nbsp; {jack.weight}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </li>
            ))
          : <p>Error loading pallet jacks data</p>
        }
      </ul>
    </div>
  );
}

export default ListItem;



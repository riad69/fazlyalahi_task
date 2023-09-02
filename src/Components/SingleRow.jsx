import React from "react";

const SingleRow = ({ single_data, index }) => {
  const {
    name,
    project_link,
    project_id,
    project_budget,
    bid_value,
    created_date,
    created_by,
    bidding_delay_time,
    status,
  } = single_data;
  console.log(single_data);
  const statusClass = status === "Active" ? "active-status" : "not-active-status";

  return (
    <tr className="cursor-pointer" title="Move cursor to drag the column">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{project_link}</td>
      <td>{project_id}</td>
      <td>${project_budget}</td>
      <td>${bid_value}</td>
      <td>{created_date}</td>
      <td>{created_by}</td>
      <td>{bidding_delay_time}</td>
      <td className={statusClass}>{status}</td>
    </tr>
  );
};

export default SingleRow;

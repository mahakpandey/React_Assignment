import moment from "moment";
import React from "react";

const Table = ({ dataOrg }) => {
  return (
    <>
      <div className="overflow-x-scroll">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Channel</th>
              <th>Request Des.</th>
              <th style={{ width: "150px !important" }}>Contact No.</th>
              <th>State</th>
              <th>District</th>
              <th>Source Time</th>
            </tr>
          </thead>
          <tbody>
            {dataOrg &&
              dataOrg.data &&
              dataOrg.data.length > 0 &&
              dataOrg?.data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.category ? e.category : "NA"}</td>
                    <td>{e.channel ? e.channel : "NA"}</td>
                    <td style={{ width: "260px" }}>
                      {e.request_description ? e.request_description : "NA"}
                    </td>
                    <td style={{ width: "150px !important" }}>
                      {e.contact_numbers ? e.contact_numbers : "NA"}
                    </td>
                    <td>{e.state ? e.state : "NA"}</td>
                    <td>{e.district ? e.district : "NA"}</td>
                    <td>
                      {moment(e.source_time).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

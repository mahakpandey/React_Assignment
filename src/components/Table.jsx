import React from 'react'

const Table = ({dataOrg}) => {

  return (
    <>
     <div>
      <table>
      <thead >
                    <tr>
                            <th>Category</th>
                            <th>Channel</th>
                            <th>Request Des.</th>
                            <th>Contact No.</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Source Time</th>
                    </tr>
                </thead>

                {
        dataOrg?.data.map((e,i)=>{
           return (
            <>
                <tr key={i}>
                    <td>{e.category}</td>
                    <td>{e.channel}</td>
                    <td style={{width: '260px'}}>{e.request_description}</td>
                    <td>{e.contact_numbers}</td>
                    <td>{e.state}</td>
                    <td>{e.district ? e.district : 'NA'}</td>
                    <td>{e.source_time}</td>
                </tr>
            </>
            )
        })
      }
      </table>
      
      
    </div>

    </>
   
  )
}

export default Table

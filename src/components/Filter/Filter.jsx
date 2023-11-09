import React from 'react'

const Filter = ({handleDropdownChange, option}) => {
  return (
    <div className="filter-section">
    <select name="category" id="" onChange={handleDropdownChange}>
      <option value="">Select Category</option>
      {option.category.map((e,i)=>{
        return  <option  key={i} value={e}  >{e}</option>
      })}
    </select>
    <select name="channel" id="" onChange={handleDropdownChange}>
    <option value="">Select Channel</option>
    {option.channel.map((e,i)=>{
        return  <option  key={i} value={e}  >{e}</option>
      })}
    </select>
    <select name="state" id="" onChange={handleDropdownChange}>
    <option value="">Select State</option>
    {option.state.map((e,i)=>{
        return  <option  key={i} value={e}  >{e}</option>
      })}
    </select>
  </div>
  )
}

export default Filter

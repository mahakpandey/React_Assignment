import React, { useEffect, useState } from "react";
import SearchBar from "../Header/SearchBar";
import Table from "../Table/Table";
import gif from "../../assets/loader.gif";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const [dataOrg, setDataOrg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [option, setOption] = useState({
    category: [],
    channel: [],
    state: [],
  });
  const [category, setCategory] = useState("");

  const getTotalPages = (totalData) => {
    const totalPages = Math.ceil(totalData / 50);
    return totalPages;
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDropdownChange = async(e) =>{
    console.log('e.target.value', e.target.name)
    if( e.target.name === "category"){
      const result = await fetch(
      
        `https://staging.iamdave.ai/list/supply?_page_number=1&category=${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
            "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
            "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
          },
        }
      );
      const response = await result.json();
      const filterData = response?.data
      setDataOrg(filterData)
      
    }
    else if( e.target.name === "channel"){
      const result = await fetch(
      
        `https://staging.iamdave.ai/list/supply?_page_number=1&channel=${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
            "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
            "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
          },
        }
      );
      const response = await result.json();
      const filterData = response?.data
      setDataOrg(filterData)
    }
    else if( e.target.name === "state"){
      const result = await fetch(
      
        `https://staging.iamdave.ai/list/supply?_page_number=1&state=${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
            "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
            "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
          },
        }
      );
      const response = await result.json();
      const filterData = response?.data
      setDataOrg(filterData)
    }

    console.log('dataOrg', dataOrg)

   
  }

  const getOptions = async () => {
    const filterArr = ["category", "channel", "state"];
    setIsLoading(true);
    for (let i = 0; i < filterArr.length; i++) {
      const result = await fetch(
        `https://staging.iamdave.ai/unique/supply/${filterArr[i]}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
            "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
            "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
          },
        }
      );
      const response = await result.json();
      const resData = response?.data
      setIsLoading(false);
      i === 0
        ? setOption((prevState)=>( {...prevState, category: Array.from(Object.keys(resData)) }) )
        : i === 1
        ? setOption((prevState)=>( {...prevState, channel: Array.from(Object.keys(resData)) }) )
        : i === 2
        ? setOption((prevState)=>( {...prevState, state: Array.from(Object.keys(resData)) }) )
        : setOption((prevState)=>( {...prevState}) )
    }
  };


  //////
  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await fetch(
        `https://staging.iamdave.ai/list/supply?_page_number=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
            "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
            "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
          },
        }
      );
      const apiData = await res.json();
      setIsLoading(false);
      if (apiData) {
        setDataOrg(apiData);

        setTotalPages(getTotalPages(apiData.total_number));
      }
    }

    getData();
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <div className="loaderGif">
          <img style={{ height: "100px" }} src={gif} alt="" />
        </div>
      ) : (
        <>
          {/* <SearchBar getSearchData={getSearchData} /> */}
          <div className="filter-section">
            <select name="category" id="" onChange={handleDropdownChange}>
              {option.category.map((e,i)=>{
                return  <option  key={i} value={e}  >{e}</option>
              })}
            </select>
            <select name="channel" id="" onChange={handleDropdownChange}>
            {option.channel.map((e,i)=>{
                return  <option  key={i} value={e}  >{e}</option>
              })}
            </select>
            <select name="state" id="" onChange={handleDropdownChange}>
            {option.state.map((e,i)=>{
                return  <option  key={i} value={e}  >{e}</option>
              })}
            </select>
          </div>

          <Table dataOrg={dataOrg} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePaginationClick={handlePaginationClick}
          />
        </>
      )}
    </div>
  );
};

export default Home;

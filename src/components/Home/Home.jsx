import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import gif from "../../assets/loader.gif";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";

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

  const getTotalPages = (totalData) => {
    const totalPages = Math.ceil(totalData / 50);
    return totalPages;
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDropdownChange = async (e) => {
    if (e.target.name === "category") {
      setIsLoading(true);
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
      const filterData = response;
      console.log("filterData", filterData);
      setDataOrg(filterData);
      setTotalPages(getTotalPages(filterData.total_number));
      setIsLoading(false);
    } else if (e.target.name === "channel") {
      setIsLoading(true);
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
      const filterData = response;
      setDataOrg(filterData);
      setTotalPages(getTotalPages(filterData.total_number));
      setIsLoading(false);
    } else if (e.target.name === "state") {
      setIsLoading(true);
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
      const filterData = response;
      setDataOrg(filterData);
      setTotalPages(getTotalPages(filterData.total_number));
      setIsLoading(false);
    } else {
      getData();
    }
  };

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
      const resData = response?.data;
      setIsLoading(false);
      i === 0
        ? setOption((prevState) => ({
            ...prevState,
            category: Array.from(Object.keys(resData)),
          }))
        : i === 1
        ? setOption((prevState) => ({
            ...prevState,
            channel: Array.from(Object.keys(resData)),
          }))
        : i === 2
        ? setOption((prevState) => ({
            ...prevState,
            state: Array.from(Object.keys(resData)),
          }))
        : setOption((prevState) => ({ ...prevState }));
    }
  };

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

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
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
          <Filter handleDropdownChange={handleDropdownChange} option={option} />
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

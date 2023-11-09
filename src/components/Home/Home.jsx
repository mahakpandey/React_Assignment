import React, { useEffect, useState } from "react";
import SearchBar from "../Header/SearchBar";
import Table from "../Table/Table";
import gif from "../../assets/loader.gif";
import SweetPagination from "sweetpagination";

const Home = () => {
  const [dataOrg, setDataOrg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, SetPageNum] = useState(1);
  const [items, setItems] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await fetch(
        `https://staging.iamdave.ai/list/supply?_page_number=${1}`,
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
      console.log("apiData", apiData);
      if (apiData) {
        setDataOrg(apiData);
        let arr = new Array(apiData.total_number).fill(0);
        setItems([...arr]);
      }
    }

    getData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loaderGif">
          <img style={{ height: "100px" }} src={gif} alt="" />{" "}
        </div>
      ) : (
        <>
          <SearchBar />
          <Table dataOrg={dataOrg} />
          <SweetPagination
            currentPageData={setCurrentPageData}
            getData={items}
            navigation={true}
            dataPerPage={50}
            getStyle={"my-style"}
          />
        </>
      )}
    </div>
  );
};

export default Home;

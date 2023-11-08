import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchBar from "../Header/SearchBar";
import Table from "../Table";
import gif from '../../assets/loader.gif'

const Home = () => {

  const [dataOrg, setDataOrg] = useState({data: []});
  const [isLoading , setIsLoading] = useState(false);
  const [ pageNum , SetPageNum] = useState(1)

    useEffect(() => {
      async function getData() {
        setIsLoading(true)
        const res = await fetch(
          `https://staging.iamdave.ai/list/supply?_page_number=${pageNum}`,
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
        setIsLoading(false)
        console.log("apiData", apiData);
        if (apiData){
          setDataOrg(apiData);
        }
        
      }

      getData();
    }, []);

  return (
    <div>
      <Header />
      
      {
        !isLoading ? <>
        <SearchBar /> <Table dataOrg={dataOrg} />
        </> 
        : <div className="loaderGif"> <img style={{height: '100px'}} src={gif} alt="" /> </div>
      }
      
    </div>
  );
};

export default Home;

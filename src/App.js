import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import "./App.css";
import { sortData,prettyPrintStat } from "./util";
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country2, setCountry2] = useState("worldwide");
  const [countryInfo, setCountryInfo]=useState({})
  const [tableDate, setTableData]=useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries]=useState([])
  const [casesType, setCasesType]=useState("cases")





  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });

  },[])

  useEffect(() => {
    //async---> send a request to the server and wait for the response.

    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data)

          setTableData(sortedData)

          setCountries(countries);

          setMapCountries(data);
        });
    };

    getCountryData();
  }, []);

const onChangeCountry =  async(event)=> {
    const countryCode = event.target.value;
    setCountry2(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  

        await fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
         
          setCountry2(countryCode)
          setCountryInfo(data);


          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          console.log(data.countryInfo.lat,"lat");
          console.log(data.countryInfo.long,"long");
          setMapZoom(5);

        })
}

// console.log("byeee>>>>>>",countryInfo)



  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> Covid-19 tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onChangeCountry}
              value={country2}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/**loop through all the countrys and show a dropdown list of the options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />

          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          {/**table */}
          <h2>Live Cases by Country</h2>
          <Table countries={tableDate} />
          <h2>Worldwide {casesType}</h2>
          <LineGraph
          
          casesType={casesType} />
          {/**Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ResultList, SelectedFilters } from '@appbaseio/reactivesearch';
import './App.css';
import './SteamSearch.css'
class App extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="steam-search"
          url="http://localhost:9200"
          theme={
            {
              typography: {
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '16px',
              },
              colors: {
                titleColor: '#c7d5e0',
                textColor: '#c7d5e0',
                backgroundColor: '#212121',
                primaryColor: '#2B475E',
              }
            }
          }
        >
          <DataSearch
            componentId="title"
            dataField={["ResponseName"]}
            queryFormat="and"
            placeholder="enter search term"
            showIcon={false}
            title="Steam Search"
            className="data-search"
            innerClass={{
              input: 'input',
              list: 'list',
            }}
          />
          <SelectedFilters />
          <ResultList
            componentId="resultLists"
            dataField="ResponseName"
            size={25}
            pagination={true}
            react={{
              "and": ["title"]
            }}
            onData={(res) => {
              return {
                image: res.HeaderImage,
                title: res.ResponseName,
                description: `
                <p class="releaseDate">${res.ReleaseDate}</p>
                <p class="price">$${res.PriceInitial}</p>
                `,
                url: `https://store.steampowered.com/app/${res.ResponseID}`,
              }
            }}
            sortOptions={[
              { label: "Best Match", dataField: "_score", sortBy: "desc" },
              { label: "Lowest Price", dataField: "PriceInitial", sortBy: "asc" },
              { label: "Highest Price", dataField: "PriceInitial", sortBy: "desc" },
            ]}
            className="result-list"
            innerClass={{
              resultsInfo: "resultsInfo",
              resultStats: "resultStats",
              listItem: "listItem",
              image: "image",
            }}
          />
        </ReactiveBase>
      </div >
    );
  }
}
export default App;
import React, { Component } from 'react';
import { ReactiveBase, DataSearch, ResultList, SelectedFilters } from '@appbaseio/reactivesearch';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="steam-search"
          url="http://localhost:9200"
        >
          <DataSearch
            componentId="title"
            dataField={["ResponseName"]}
            queryFormat="and"
          />
          <SelectedFilters />
          <ResultList
            componentId="resultLists"
            dataField="ResponseName"           
            size={10}
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
          />
        </ReactiveBase>
      </div >
    );
  }
}
export default App;
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
                title: res.ResponseName,
              }
            }}
          />
        </ReactiveBase>
      </div >
    );
  }
}
export default App;
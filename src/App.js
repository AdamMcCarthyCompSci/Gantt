import './App.css';
import React from 'react';
import { IncrementRows } from './features/table/IncrementRows';
import { IncrementMonths } from './features/table/IncrementMonths';
import { Table } from './features/table/Table';
import { LeftTable } from './features/table/LeftTable';
import "@fontsource/roboto";
import Grid from "@material-ui/core/Grid";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

function App() {
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <IncrementRows />
        </Grid>
        <Grid item xs={10}>
          <IncrementMonths />
        </Grid>
        <ScrollSync>
          <React.Fragment>
            <Grid item xs={2}>
              <ScrollSyncPane>
                <LeftTable/>
              </ScrollSyncPane>
            </Grid>
            <Grid item xs={10}>
              <ScrollSyncPane>
                <Table/>
              </ScrollSyncPane>
            </Grid>
            </React.Fragment>
        </ScrollSync>
      </Grid>
    </div>
  );
}

export default App;

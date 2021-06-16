import './App.css';
import React from 'react';
import { IncrementRows } from './features/table/IncrementRows';
import { IncrementMonths } from './features/table/IncrementMonths';
import { CreateTheme } from './features/table/CreateTheme';
import { Table } from './features/table/Table';
import { LeftTable } from './features/table/LeftTable';
import { TaskInfo } from './features/table/TaskInfo';
import "@fontsource/roboto";
import Grid from "@material-ui/core/Grid";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

function App() {
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <IncrementRows />
        </Grid>
        <Grid item xs={4}>
          <IncrementMonths />
        </Grid>
        <Grid item xs={4}>
          <CreateTheme />
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
        <Grid item xs={12}>
          <TaskInfo />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

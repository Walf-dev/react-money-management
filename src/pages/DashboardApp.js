// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  Today,
  ThisMonth,
  ThisWeek,
  AppNewsUpdate,
  TotalSpent,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  LeastSpentDay,
  MostSpentDay,
  MostSpentOn,
  ThisYear,
} from "../components/_dashboard/app";

import ExpensesTable from "../components/_dashboard/ExpensesTable";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Money-Management">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Your summary</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalSpent />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Today />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ThisWeek />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ThisMonth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ThisYear />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MostSpentOn />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MostSpentDay />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LeastSpentDay />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <ExpensesTable />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

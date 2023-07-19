import { Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
});

const WithSidebar = () => (
  <Box
    display="flex"
    sx={{
      height: "100%"
    }}
  >
    <Sidebar />
    <Outlet />
  </Box>
)

export const App = () => (
  <>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ApolloProvider client={client}>
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" exact element={<LoginPage />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<WithSidebar />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </main>
          <ToastContainer />
        </div>
      </ApolloProvider>
    </LocalizationProvider>
  </>
);

import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
});

export const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ApolloProvider client={client}>
          <div className="app">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </ApolloProvider>
      </LocalizationProvider>
    </>
  );
}

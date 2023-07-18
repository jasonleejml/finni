import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="app">
         <Sidebar />
        <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </main>
        </div>
      </ApolloProvider>
    </>
  );
}

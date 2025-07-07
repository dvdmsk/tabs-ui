import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import PageContent from "./pages/PageContent/PageContent";
import { tabs } from "./api/tabs";

function App() {
  const preparedTabs = tabs;
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageContent />} />
        {preparedTabs.map(tab => (
          <Route path={`${tab.link}`} key={tab.id} element={<PageContent />} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;

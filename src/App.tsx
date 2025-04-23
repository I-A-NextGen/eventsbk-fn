import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

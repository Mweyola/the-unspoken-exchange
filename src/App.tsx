import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guidelines from "./pages/Guidelines";
import Marketplace from "./pages/Marketplace";
import Privacy from "./pages/Privacy";
import QuestionDetail from "./pages/QuestionDetail";
import Search from "./pages/Search";
import SellerSignup from "./pages/SellerSignup";
import SellerProfile from "./pages/SellerProfile";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerSignup from "./pages/BuyerSignup";
import BuyerProfile from "./pages/BuyerProfile";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/search" element={<Search />} />
            <Route path="/seller/signup" element={<SellerSignup />} />
            <Route path="/seller/:slug" element={<SellerProfile />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/buyer/signup" element={<BuyerSignup />} />
            <Route path="/buyer/:slug" element={<BuyerProfile />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;

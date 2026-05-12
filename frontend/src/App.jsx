import { useAuth } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router";

import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import { SentryDemoPage } from "./pages/SentryDemoPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderChatPage from "./pages/OrderChatPage";
import OrderVideoPage from "./pages/OrderVideoPage";
import AdminProductsPage from "./pages/AdminProductsPage";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/product/:slug" element={<ProductDetailPage />} />

        <Route
          path="/orders"
          element={isSignedIn ? <OrdersPage /> : <Navigate to="/" replace />}
        />

        <Route path="/checkout/return" element={<CheckoutReturnPage />} />

        <Route path="/demo-sentry" element={<SentryDemoPage />} />

           <Route
          path="/orders/:id/call"
          element={isSignedIn ? <OrderVideoPage /> : <Navigate to={"/"} replace />}
        />

            <Route
          path="/admin"
          element={isSignedIn ? <AdminProductsPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/orders/:id"
          element={
            isSignedIn ? <OrderDetailPage /> : <Navigate to="/" replace />
          }
        >
          <Route index element={<OrderSummaryPage />} />

          <Route path="chat" element={<OrderChatPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
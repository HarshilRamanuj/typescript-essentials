import "./App.css";

import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hooks from "./pages/Hooks";
import { ThemeContext } from "./components/HooksPractice/UseContext/UseContext1";
import { ProductExamples } from "./pages/ProductExamples";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout sidebar={<Sidebar />} />,
      children: [
        {
          path: "productDetails",
          element: <ProductDetails />,
        },
        {
          path: "productExamples",
          element: <ProductExamples />,
        },
        {
          path: "hooks",
          element: <Hooks />,
        },
      ],
    },
  ]);

  return (
    <ThemeContext.Provider value="dark">
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;

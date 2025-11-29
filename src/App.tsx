import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductFeed from "./components/ProductFeed";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductFeed />
    </QueryClientProvider>
  );
}

export default App;

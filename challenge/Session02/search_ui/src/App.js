import { ConfigProvider } from "antd";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./root";

function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#751c24",
                        },
                    }}
                >
                    <Root />
                </ConfigProvider>
            </BrowserRouter>
            <ReactQueryDevtools position={"bottom-right"} />
        </QueryClientProvider>
    );
}

export default App;

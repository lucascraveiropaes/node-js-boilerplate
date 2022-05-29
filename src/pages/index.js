import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "utilities/theme";

// Pages
import Home from "./Home/";

export default function Pages() {
  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route path="*" element={ <Navigate replace to="/"/> } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

import React from 'react'
import axios from "axios";

import Frame from "./components/Frame";
export default function App() {
  axios.get("/api/cart/search/123").then(res =>console.log(res));
  return (
    <div>
        <Frame>
          
        </Frame>
    </div>
  )
}

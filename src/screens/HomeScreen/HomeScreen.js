import React from "react";
import { Home } from "./HomeScreen.render";

const HomeScreen = () => {
  return (
    <>
      <Home />
    </>
  );
};
export const vid = () => {
  const button = document.getElementById("post-btn");
  button.addEventListener("click", async (_) => {
    try {
      const response = await fetch("http://localhost:3030/", {
        method: "get",
      });
      const url = response.url;
      document.getElementById("Take-class").innerHTML =
        "->" + "<a href='" + url + "'>Start Class</a>";
      console.log("Completed!", response.url);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  });
};
export default HomeScreen;

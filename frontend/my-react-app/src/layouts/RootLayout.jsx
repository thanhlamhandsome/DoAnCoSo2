import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../component/Root/Header";
import Footer from "../component/Root/Footer";
import { getTokenDuration } from "../util/auth";
import { useEffect, useState } from "react";

function RootLayout() {
  const submit = useSubmit();

  const token = useLoaderData();
  console.log(token);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED" || token === null) {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const duration = getTokenDuration();

    const timer = setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
    return () => clearTimeout(timer);
  }, [token, submit]);

  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Nội dung từ route con */}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;

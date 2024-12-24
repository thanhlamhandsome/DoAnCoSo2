import { useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import VideoLayout from "../layouts/VideoLayout";

import { useLoaderData } from "react-router-dom";
import HiddenDiv from "../component/Root/HiddenDiv";

function HomePage() {
  const games = useLoaderData();
  return (
    <>
      <VideoLayout games={games} />
      <HiddenDiv />
      <MainLayout />
    </>
  );
}

export async function loader() {
  
  try {
    const response = await fetch("http://localhost:3000/");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Data format is incorrect");
    }
    
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

export default HomePage;

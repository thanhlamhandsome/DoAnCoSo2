import { Await, useLoaderData } from "react-router-dom";
import RangeSliderComponent from "./RangeSliderComponent";
import { Suspense, useState } from "react";
import Loader from "../Root/Loader";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
function SiderBar({ valuedefault, onValueChange }) {
  const loaderGenre = useLoaderData();
  const [genres, setGenres] = useState([]); // Lưu trữ các genre
  const [selectedGenres, setSelectedGenres] = useState([]); // Lưu trữ các genre được chọn
  const [value, setValue] = useState([0, 100]);

  const handleSliderChange = (newValue) => {
    setValue(newValue);  // Cập nhật giá trị trong SiderBar
    if (onValueChange) {
      onValueChange(newValue);  // Gọi callback từ props (nếu có)
    }
  };

  const handleCheckboxChange = (event) => {
    const genre = event.target.value;
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genre)) {
        // Nếu genre đã có trong mảng, bỏ nó đi (uncheck)
        return prevSelected.filter((g) => g !== genre);
      } else {
        // Nếu genre chưa có, thêm vào mảng (check)
        return [...prevSelected, genre];
      }
    });
  };
  const dispatch = useDispatch() ; 
  
  const handleSearch = () => {
    dispatch(
      uiAction.handleSearch({
        genres: selectedGenres,
        minValue: value[0],
        maxValue: value[1],
      })
    );
  };

  return (
    <div className="w-64 p-4 bg-[rgb(25,24,31)] border-2 max-h-[900px] rounded-xl ml-5 border-lime-200">
      <div className="mb-6">
        <h3 className="text-xl text-orange-300 font-semibold mb-3">Thể loại</h3>
        <div id="category-list" className="space-y-2">
          <Suspense fallback={<Loader />}>
            <Await resolve={loaderGenre.loadGame}>
              {(games) => {
                // Cập nhật danh sách thể loại
                games.forEach((game) => {
                  if (!genres.includes(game.genre)) {
                    genres.push(game.genre);
                  }
                });
                return genres.map((genre, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={genre}
                      name="category"
                      value={genre}
                      checked={selectedGenres.includes(genre)} // Kiểm tra nếu genre đã được chọn
                      onChange={handleCheckboxChange} // Gọi hàm khi checkbox thay đổi
                      className="mr-2"
                    />
                    <label htmlFor={genre} className="text-white">
                      {genre}
                    </label>
                  </div>
                ));
              }}
            </Await>
          </Suspense>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-orange-300">Tìm kiếm theo giá</h3>
        <div className="space-y-4">
          <p className="text-white mt-2">Giá trị hiện tại: {value[0]} - {value[1]}</p>
          <RangeSliderComponent valuedefault={value} onValueChange={handleSliderChange} />
          <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"  onClick={() => handleSearch(loaderGenre.loadGame)}>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SiderBar;

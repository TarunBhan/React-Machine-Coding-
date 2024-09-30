import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/layout";
import Home from "./component/Home";
import Test from "./component/Test";
import Practice from "./component/Practice";
import BoxWidget from "./component/round2";
import OtpInput from "./component/otp";
import Accordian from "./component/Accordian";
import Comment from "./component/comment";
import Todo from "./component/todo/todo";
import Password from "./component/password/password";
import StarComponent from "./component/Star";
import MxPlayer from "./component/mxplayer";
import Form from "./component/form/input";
import List from "./component/DragDropList";
import DragDrop from "../src/component/DragDrop/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />}></Route>
        <Route path="/practice" element={<Practice />}></Route>
        <Route path="/round2" element={<BoxWidget />}></Route>
        <Route path="/otp" element={<OtpInput />}></Route>
        <Route path="/accordian" element={<Accordian />}></Route>
        <Route path="/comment" element={<Comment />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="/password" element={<Password />}></Route>
        <Route path="/star" element={<StarComponent />}></Route>
        <Route path="/video" element={<MxPlayer />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/todolist" element={<List />}></Route>
        <Route path="/dragdrop" element={<DragDrop />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();


  const url = "http://localhost:5000";

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(url + "/api/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  console.log(posts)

  return (
    <>
      <Header />
      <div className="home">
        {<Posts posts={posts} /> /*sending posts as props */}
        <Sidebar />
      </div>
    </>
  );
}

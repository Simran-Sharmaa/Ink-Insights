import React, { useEffect, useState } from "react";
import dbStorage from "../appwrite/db_and_storage";
import { Container, PostCard } from "../components";
import { Loader } from "../components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) navigate("/login");
    else {
      try {
        setLoader(true);
        dbStorage.getPosts().then((posts) => {
          if (posts) setPosts(posts.documents);
        });
        setLoader(false);
      } catch (error) {
        console.log("Home.js::", error.message);
      }
    }
  }, [userData, navigate]);
  // if(!loader){
  //   if (posts.length === 0) {
  //     return <div className="text-center mt-3 font-weight-bold">No post available</div>;
  //   }
  // }
  return loader ? (
    <div className="App">
      <Loader />
    </div>
  ) : (
    <Container>
      <div className="row">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;

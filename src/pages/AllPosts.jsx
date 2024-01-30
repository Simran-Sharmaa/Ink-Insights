import React, { useEffect, useState } from "react";
import dbService from "../appwrite/db_and_storage";
import { Container, PostCard, Loader } from "../components";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
function AllPosts() {
  const user = useSelector((state) =>state.auth.userData)
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true)
    dbService.getPosts([Query.equal("userId",`${user.userData.$id}`)]).then((posts) => {
      if (posts) setPosts(posts.documents);
    }).then(setLoader(false));
  }, [user]);
  // if(posts.length === 0 )
  //   return (<div className="text-center m-5 p-5">No posts</div>)
  return !loader ? (
    <Container>
      <div className="row">
        {posts?.map((post) => (
          <div className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  ) : (
    <Loader />
  );
}

export default AllPosts;

import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container/Container";
import service from "../appwrite/db_and_storage";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="text-decoration-none ">
      <Container >
    {/* <div className="card" style={{ width: "18rem",height:"27rem" }}> */}
    <div className="card">
      <img
        src={service.getFilePreview(featuredImage)}
        className="card-img-top h-100 border-bottom "
        alt={title}
        style={{  aspectRatio: "1/1" , objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize text-center m-0">{title}</h5>
      </div>
    </div>
  </Container>
    </Link>
  );
}

export default PostCard;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbStore from "../appwrite/db_and_storage";
import { Container, Button } from "../components";
import parse from "html-react-parser";
import { MdEdit } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const isAuthor =
    post && userData ? post.userId === userData.userData.$id : false;
  useEffect(() => {
    if (slug) {
      dbStore.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);
  const deletePost = async () => {
    await dbStore.deletePost(post.$id).then(async (status) => {
      if (status) {
        await dbStore.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div>
      <Container>
        <div className="d-flex justify-content-between">
          <img className="mb-3"
            style={{ aspectRatio: "4/3", height: "20rem", objectFit: "cover" }}
            src={dbStore.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          <div className="d-flex flex-column justify-content-between">

          {isAuthor && (
            <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link
                to={`/edit-post/${post.$id}`}
                className="text-decoration-none "
              >
                <Button className="btn me-md-2" type="button">
                  {/* Edit */}
                  <MdEdit size={25} />
                  {/* <VscEdit/> */}
                </Button>
              </Link>
              <Link>
                <Button className="btn text-danger " onClick={deletePost}>
                  <MdDelete size={25} />
                </Button>
              </Link>
            </div>
          
          <h5 className={`align-self-end text-capitalize ${post.status?"text-success":"text-danger"} `}>
            {post.status?post.status:"inactive"}
          </h5>
          </>
          )}
          </div>

        </div>

        <h2 className="text-capitalize mb-3">{post.title}</h2>
        <div>{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;

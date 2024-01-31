import React, { useEffect } from "react";
import RTE from "../Utils/RTE";
import dbService from "../../appwrite/db_and_storage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { Button, Input, Select } from "../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PostForm({ post }) {
  const navigate = useNavigate();
  // console.log(post);
  const userData = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const submit = async (data) => {

    try {
      // if(data === post)
      let file = null;
      if (data.image && data.image[0]) {
        // If a new image is uploaded, upload it and delete the existing one
        file = await dbService.uploadFile(data.image[0]);
        if (post && post.featuredImage) {
          await dbService.deleteFile(post.featuredImage);
        }
      }

      if (file || (post && post.featuredImage)) {
        const postData = { ...data };
        if (file) {
          postData.featuredImage = file.$id;
        } else {
          // If no new image is uploaded, keep the existing one
          postData.featuredImage = post.featuredImage;
        }

        let dbPost;
        if (post) {
          // If it's an edit operation
          dbPost = await dbService.updatePost(post.$id, postData);
        } else {
          // If it's a new post creation
          dbPost = await dbService.createPost({
            ...postData,
            userId: userData.userData.$id,
          });
        }
        if (dbPost) {
          toast.success("The data has been updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
        });
      console.log("Error during form submission", error.message);
    }
  };
  const transformSlug = useCallback((value) => {
    if (value && typeof value === "string") {
      // return value.trim().toLowerCase().replace(/ /g, '-');
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transformSlug(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, transformSlug, setError]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ transition: "Bounce" }}
      />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Title:"
          {...register("title", {
            required: "Required",
          })}
        />
        <div
          className="p-1 text-medium text-end text-danger"
          style={{ width: "100%", height: "20px" }}
        >
          {errors?.title && "Required"}
        </div>
        {/* <ErrorMessage
        errors={errors}
        name="title"
        className="p-1 text-medium text-end text-danger"
        render={({ message }) => <div>{message}</div>}
      /> */}
        <Input
          label="Slug:"
          {...register("slug", { required: "Required" })}
          onInput={(e) =>
            setValue("slug", transformSlug(e.target.value), {
              shouldValidate: true,
            })
          }
        />
        <div
          className="p-1 text-medium text-end text-danger"
          style={{ width: "100%", height: "20px" }}
        >
          {errors?.slug?.message}
        </div>

        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <div
          className="p-1 text-medium text-end text-danger"
          style={{ width: "100%", height: "20px" }}
        >
          {errors?.content && "Required"}
        </div>
        <Input
          label="Image:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post && "Required" })}
        />
        <div
          className="p-1 text-medium text-end text-danger"
          style={{ width: "100%", height: "20px" }}
        >
          {errors?.image && "Required"}
        </div>
        {post && (
            // <div>Existing Image</div>
          // <div className="card mb-3" style={{width:"18rem"}}>
            <img className="mb-3" style={{width:"18rem"}}
              src={dbService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          // </div>
        )}
        <Select
          label="Status:"
          options={["active", "inactive"]}
          {...register("status")}
        />
        <Button type="submit">{post ? "Update" : "Submit"}</Button>
      </form>
    </>
  );
}

export default PostForm;


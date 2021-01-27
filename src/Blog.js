import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NotionRenderer } from "react-notion";

function Blog({ post }) {
  const [blog, setBlog] = useState({});
  
  useEffect(() => {
    axios
      .get(`https://notion-api.splitbee.io/v1/page/${ post.id }`)
      .then((res) => {
        setBlog(res.data);
      });
  }, [post.id]);

  return (
    <div className="content justify-content-center">
      <h1 className="dark-brown mt-3 text-center">{post.page}</h1>
      <h5 className="light-brown text-center">Posted on {post.date}</h5>
      <div className="mt-5">
        <NotionRenderer blockMap={blog} />
      </div>
      <Link to="/">
        <h4 className="mt-4 light-brown">Back</h4>
      </Link>
    </div>
  );
}

export default Blog;

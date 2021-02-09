import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import fotoProfil from "./assets/fotoProfil.jpeg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Blog from "./Blog.js";
import NoMatch from './NoMatch.js'

function App() {
  const NOTION_BLOG_ID = process.env.REACT_APP_NOTION_BLOG_ID;
  
  const [posts, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
      )
      .then((res) => {
        setPost(res.data.filter((post) => post.published).reverse());
      });
  }, [NOTION_BLOG_ID]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="row">
            <header className="col-12 col-lg-6 p-5">
              <h1 className="brand">
                Chavyv<span className="dark-brown">.</span>Blog
              </h1>
              <img
                className="foto-profil rounded-circle my-3"
                src={fotoProfil}
                alt="foto profil"
              />
              <p>
                Welcome to my blog! This is my place to share something about my
                life or random thoughts. Hope you enjoy this content!
              </p>
              <footer className="mt-5">
                Made with{" "}
                <a
                  href="https://getbootstrap.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bootstrap
                </a>
                ,{" "}
                <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                  ReactJS
                </a>
                , &{" "}
                <a
                  href="https://www.notion.so"
                  target="_blank"
                  rel="noreferrer"
                >
                  Notion
                </a>
                . Source available on{" "}
                <a
                  href="https://github.com/akbar2habibullah/chavyv-blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>{" "}
                <br />
                Copyright © { new Date().getFullYear() }{" "}
                <a
                  href="https://www.chavyv.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chavyv Akvar
                </a>
                . All Rights Reserved
              </footer>
            </header>
            <div className="col-12 col-lg-6 p-5">
              <h1>Posts</h1>
              <div className="posts">
                {posts.map((post) => (
                  <Link to={`/blog/${post.slug}`}>
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">
                          <h2>{post.page}</h2>
                        </div>
                        <div className="card-subtitle">
                          <div>Posted on {post.date}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Route>
        {posts.map((post) => (
          <Route path={`/blog/${post.slug}`} exact>
            <Blog post={post} />
          </Route>
        ))}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

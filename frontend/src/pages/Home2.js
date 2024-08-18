import React, { Component } from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Blog from "./../components/Blog";
import "./../../static/style/home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    api
      .get("/api/blogs/")
      .then((res) => res.data)
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => alert(err));
  };
  const deleteBlog = (id) => {
    api
      .delete(`/api/blogs/delete/${id}`)
      .then((res) => {
        if (res.status == 204) {
          alert("Blog deleted!");
        } else {
          alert("Failed tp delete to Blog");
        }
        getBlogs();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const updateBlog = (
    id,
    updatedTitle,
    updatedDescription,
    updatedCategory,
    updatedTags
  ) => {
    api
      .put(`/api/blogs/update/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
        category: updatedCategory,
        tags: updatedTags,
      })
      .then((res) => {
        if (res.status == 200) {
          alert("Blog updated!");
        } else {
          alert("Failed tp update to Blog");
        }
        getBlogs();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const createBlog = (e) => {
    e.preventDefault();
    api
      .post("/api/blogs/create/", { title, description, category, tags })
      .then((res) => {
        if (res.status == 201) {
          alert("Blog Created!");
        } else {
          alert("Failed tp create to Blog");
        }
        getBlogs();
        setTitle("");
        setDescription("");
        setCategory("");
        setTags("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div>
        <div className="header">
          <h2>Blogs</h2>
        </div>
        {blogs.map((blog) => (
          <Blog
            blog={blog}
            onDelete={deleteBlog}
            onUpdate={updateBlog}
            key={blog.id}
          />
        ))}
      </div>
      <h2>Create a Blog </h2>
      <form onSubmit={createBlog}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="category">Category:</label>
        <br />
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="TECH">Technology</option>
          <option value="LIFE">Lifestyle</option>
          <option value="FOOD">Food</option>
          <option value="TRVL">Travel</option>
          <option value="EDU">Education</option>
        </select>
        <br />
        <label htmlFor="tags">Tags:</label>
        <br />
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Enter tags separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;

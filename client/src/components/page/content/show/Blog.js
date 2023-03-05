import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import parseBody from "html-react-parser";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Show.module.css";
import Skeleton from "@mui/material/Skeleton";
import { authActions } from "../../../store/auth";
import { blogActions } from "../../../store/blog";
import { getAllBlog } from "../../../../service/MomintechApi";
import { SkeletonOfBlog } from "../../../../service/SkeletonFiller";

function Blog() {

  const navigate = useNavigate();
  const host = useSelector(state => state.auth.host)
  const isAuth = useSelector((state) => state.auth.token);
  const blogList = useSelector((state) => state.blog.blogList);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const data = await getAllBlog(host)

      if (data.status === "Unauthorized") {
        return authActions.clearToken()
      }

      if (!data.status) {
        return alert(data.errorMessage);
      }

      dispatch(blogActions.setBlogs(data))

    })()
  }, []);

  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}>
        {isAuth && <div className={`${classes.inputDiv} mt-4`}>
          <Form.Control
            onClick={() => {
              navigate("/createblog");
            }}
            placeholder="Create a blog"
            type="text"
            id="createPost"
            aria-describedby="createapost"
            className={classes.createInput}
          />
        </div>}
        {blogList.length > 0 ? blogList.map((el) => {
          return (
            <div className={`${classes.blog} mt-3`} key={el._id}>
              <Card
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${el._id}`);
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h2>
                      {el.title ? (
                        el.title
                      ) : (
                        <Skeleton width="220px" animation="wave" />
                      )}
                    </h2>
                  </Card.Title>
                  {/* <Card.Text> */}
                  <section>
                    {el.body ? (
                      parseBody(el.body)
                    ) : (
                      <>
                        <Skeleton animation="wave" />{" "}
                        <Skeleton animation="wave" />{" "}
                        <Skeleton animation="wave" />
                      </>
                    )}
                  </section>
                  {/* </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          );
        }) : <div className={`${classes.blog} mt-4`}> {SkeletonOfBlog}{SkeletonOfBlog}{SkeletonOfBlog}</div>}
        <div className="mb-5"></div>
      </div>
    </div>
  );
}

export default Blog;

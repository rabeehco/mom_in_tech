import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import parseBody from "html-react-parser";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Details.module.css";
import Skeleton from "@mui/material/Skeleton";

import { blogActions } from "../../../store/blog";
import { authActions } from "../../../store/auth";
import { getABlog } from "../../../../service/MomintechApi";
import { deleteBlog } from "../../../../service/MomintechApi";

function PostDetails() {
  const dispatch = useDispatch()
  const params = useParams();
  const { blogId } = params;
  const host = useSelector(state => state.auth.host)
  const isAuth = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.username);
  const singleBlog = useSelector((state) => state.blog.blog);

  const navigate = useNavigate();

  const deleteHandler = async () => {
    const data = await deleteBlog({host, blogId, isAuth})
    if(data.status){
      return navigate("/blog");
    }
    alert(data.message)
  };

  useEffect(() => {

    (async function () {
      const data = await getABlog({ blogId, host })
      if (data.status === "Unauthorized") {
        return dispatch(authActions.clearToken())
      }

      if (data.errorMessage) {
        return alert(data.errorMessage)
      }

      dispatch(blogActions.setBlog(data))

    })()

  }, []);

  return (

    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}>

        <div className={`${classes.blog} mt-4`}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h2>{singleBlog?.title}</h2>
              </Card.Title>
              <Card.Text>{singleBlog.body ? parseBody(singleBlog?.body) : Array(4).fill(0).map(() => <Skeleton />)}</Card.Text>
              <Card.Subtitle className='mt-4'>
                {singleBlog.username === userName ? (
                  <Button
                    onClick={() => {
                      navigate(`/editblog/${blogId}`);
                    }}
                    style={{ backgroundColor: '#80ccc8', border: 'none' }}
                    className="me-4"
                  >
                    Edit
                  </Button>
                ) : null}
                {singleBlog.username === userName ? (
                  <Button onClick={deleteHandler} style={{ background: '#dc3545', border: 'none' }}
                  >
                    Delete
                  </Button>
                ) : null}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default PostDetails;

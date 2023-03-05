import Skeleton from "@mui/material/Skeleton";
import Card from 'react-bootstrap/Card';

export const SkeletonOfBlog = (
  <Card>
    <Card.Body>
      <Card.Title>
        <h2>
          <Skeleton width="520px" animation="wave" />
        </h2>
      </Card.Title>
      <Card.Text>
        <>
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />

        </>
      </Card.Text>
      <Card.Subtitle></Card.Subtitle>
    </Card.Body>
  </Card>
);

export const SkeletonOfEvent = (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>
            <Skeleton width="220px" animation="wave" />
          </h2>
        </Card.Title>
        <Card.Text>
          <>
            <Skeleton animation="wave" /> <Skeleton animation="wave" />
            <Skeleton animation="wave" /> <Skeleton animation="wave" />
            <Skeleton animation="wave" /> <Skeleton animation="wave" />
            <Skeleton animation="wave" /> <Skeleton animation="wave" />

          </>
        </Card.Text>
        <Card.Subtitle></Card.Subtitle>
      </Card.Body>
    </Card>
);

export const SkeletonOfJob = (
  <Card>
    <Card.Body>
      <Card.Title>
        <h2>
          <Skeleton width="220px" animation="wave" />
        </h2>
      </Card.Title>
      <Card.Text>
        <>
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />
          <Skeleton animation="wave" /> <Skeleton animation="wave" />

        </>
      </Card.Text>
      <Card.Subtitle></Card.Subtitle>
    </Card.Body>
  </Card>
);


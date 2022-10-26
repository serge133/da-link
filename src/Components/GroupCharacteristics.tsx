import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

type GroupCharacteristicsProps = {
  workhardVotes: number;
  socializingVotes: number;
  totalLikes: number;
  totalDislikes: number;
  userLiked: boolean;
  userDisliked: boolean;
  userWorkhard: boolean;
  userSocialize: boolean;
  handleVoteChange: {
    handleLike: () => void;
    handleDislike: () => void;
    handleWorkhard: () => void;
    handleSocialize: () => void;
  };
};

const GroupCharacteristics = (props: GroupCharacteristicsProps) => {
  //   could be NAN because divide by zero
  const groupRating: number =
    (props.totalLikes / (props.totalDislikes + props.totalLikes)) * 100;

  const workhardRating: number =
    (props.workhardVotes / (props.socializingVotes + props.workhardVotes)) *
    100;

  const socializeRating: number =
    (props.socializingVotes / (props.socializingVotes + props.workhardVotes)) *
    100;

  return (
    <Card className="characteristics-card">
      <Card.Title>Group Characteristics</Card.Title>
      <Card.Body className="ratings">
        <div className="rating">
          <h5>Work Efficiency</h5>
          <ProgressBar
            variant="danger"
            now={workhardRating ? workhardRating : 0}
          />
        </div>
        <div className="rating">
          <h5>Socializing</h5>
          <ProgressBar
            variant="success"
            now={socializeRating ? socializeRating : 0}
          />
        </div>

        <div className="rating">
          <h5>Rating</h5>
          <ProgressBar variant="warning" now={groupRating ? groupRating : 0} />
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="rate-control">
          <ButtonGroup>
            <ToggleButton
              value="dislike"
              type="radio"
              variant="outline-warning"
              name="disliked"
              checked={props.userDisliked}
              onClick={props.handleVoteChange.handleDislike}
            >
              Dislike
            </ToggleButton>
            <ToggleButton
              value="like"
              type="radio"
              variant="outline-warning"
              name="liked"
              checked={props.userLiked}
              onClick={props.handleVoteChange.handleLike}
            >
              Like
            </ToggleButton>
          </ButtonGroup>
          <ButtonGroup>
            <ToggleButton
              value="socialize"
              type="radio"
              variant="outline-danger"
              name="radio"
              checked={props.userSocialize}
              onClick={props.handleVoteChange.handleSocialize}
            >
              Socialize
            </ToggleButton>
            <ToggleButton
              value="workhard"
              type="radio"
              variant="outline-danger"
              name="radio"
              checked={props.userWorkhard}
              onClick={props.handleVoteChange.handleWorkhard}
            >
              Workhard
            </ToggleButton>
          </ButtonGroup>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default GroupCharacteristics;

import { Post } from "@/types/post/post";
import { CSSProperties } from "react";
import ListItemCompact from "./ListItemCompact";

type Props = {
  headingStyles?: CSSProperties;
  headingText: string;
  posts: Post[];
};

const ListWithHeading = ({ headingStyles = {}, headingText, posts }: Props) => {
  return (
    <div className={''}>
      <h2 style={headingStyles}>{headingText}</h2>
      {posts.map((post) => (
        <ListItemCompact
          post={post}
          displayMetadata={false}
          titleStyle={{
            fontSize: "0.8rem",
          }}
          descriptionStyle={{
            fontSize: "0.7rem",
          }}
          imageSize={{
            width: 50,
            height: 70,
          }}
          key={post.metadata.title}
        />
      ))}
    </div>
  );
};

export default ListWithHeading;

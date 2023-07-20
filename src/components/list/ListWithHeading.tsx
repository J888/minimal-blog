import { Post } from "@/types/post/post";
import { CSSProperties, useContext } from "react";
import ListItemCompact from "./ListItemCompact";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  headingStyles?: CSSProperties;
  headingText: string;
  posts: Post[];
};

const ListWithHeading = ({ headingStyles = {}, headingText, posts }: Props) => {
  const appTheme = useContext(ThemeContext);
  const headingStylesMerged = {
    color: appTheme.textPrimary,
    ...headingStyles
  }

  return (
    <div className={''}>
      <h2 style={headingStylesMerged}>{headingText}</h2>
      {posts.map((post) => (
        <ListItemCompact
          post={post}
          displayMetadata={false}
          titleStyle={{
            fontSize: "0.8rem",
            color: appTheme.textSecondary
          }}
          descriptionStyle={{
            fontSize: "0.7rem",
            color: appTheme.textSecondarySubtitle
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

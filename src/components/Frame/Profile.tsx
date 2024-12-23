import ImageFrame from "./ImageFrame";

type ProfileProps = {
  src: string | null;
  className: string;
};

/**
 * className에 width, height 필수로 넣어줘야 함
 */
function Profile({ src, className }: ProfileProps) {
  return (
    <ImageFrame
      src={src ?? "/icons/avatar.svg"}
      alt="프로필이미지"
      round="full"
      className={className}
    />
  );
}

export default Profile;

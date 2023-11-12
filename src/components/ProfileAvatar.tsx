import { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

interface Props {
  username: string;
  boxSize: string;
}

function ProfileAvatar({ username, boxSize }: Props) {
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    const avatar = createAvatar(avataaars, {
      seed: username,
      // ... other options
    });

    const svgString = avatar.toString();
    const base64Url = `data:image/svg+xml;base64,${btoa(svgString)}`;
    setAvatarSrc(base64Url);
  }, [username]);

  return username ? (
    <Avatar src={avatarSrc} boxSize={boxSize} />
  ) : (
    <Avatar src="" boxSize={boxSize} />
  );
}

export default ProfileAvatar;

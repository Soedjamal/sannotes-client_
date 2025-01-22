import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTheUser } from "../../hooks/useTheUser";

const UsernameText = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const { getUser } = useTheUser();

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  return (
    <>
      <div className="username-text-container">{children}</div>
    </>
  );
};

export default UsernameText;

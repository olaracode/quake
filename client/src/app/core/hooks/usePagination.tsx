import { useLocation } from "react-router-dom";

const usePagination = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const limit = queryParams.get("limit") || "10";
  const query = queryParams.get("query") || "";
  return { page, limit, query };
};

export default usePagination;

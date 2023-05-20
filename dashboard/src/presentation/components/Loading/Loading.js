import "./Loading.css";

function Loading({ isLoading }) {
  if (!isLoading) return
  return <div className="loading-screen-wrapper page-container"></div>;
}

export default Loading;

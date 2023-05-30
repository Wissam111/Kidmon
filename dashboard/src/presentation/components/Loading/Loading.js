import "./Loading.css";

function Loading({ isLoading }) {
  if (!isLoading) return;
  return (
    <div className="loading-screen-wrapper page-container">
      <div className="loading"></div>
    </div>
  );
}

export default Loading;

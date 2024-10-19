import { useChat } from "../hooks/useChat";

export const OpenPage = () => {
  const { setIsUserClick } = useChat();

  return (
    <>
      <div
        onClick={() => setIsUserClick(true)}
        style={{
          cursor: "pointer",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #659999, #f4791f)",
          zIndex: 2,
        }}
      >
        <button
          style={{
            fontSize: "40px",
            padding: "20px",
            fontWeight: "800",
            letterSpacing: "0.2rem",
            overflow: "hidden",
          }}
        >
          點擊以開始互動
        </button>
      </div>
    </>
  );
};
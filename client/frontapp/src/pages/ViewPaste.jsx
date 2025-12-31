import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/paste/${id}/`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Paste not available");
        }
        return res.json();
      })
      .then((data) => {
        setContent(data.content);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return <h2 style={{ color: "red" }}>❌ {error}</h2>;
  }

  return (
    <div>
      <h2>Paste Content</h2>
      <pre>{content}</pre>
    </div>
  );
}

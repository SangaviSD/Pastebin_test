import { useState, useEffect } from "react";

export default function CreatePaste() {
    const [content, setContent] = useState("");
    const [maxViews, setMaxViews] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [pasteUrl, setPasteUrl] = useState(null);
    const [activePastes, setActivePastes] = useState([]); 


    useEffect(() => {
        fetch("http://127.0.0.1:8000/paste/active/")
            .then(res => res.json())
            .then(data => {
                
                const pastesWithUrl = data.map(paste => ({
                    id: paste.id,
                    url: `http://localhost:5173/paste/${paste.id}`
                }));
                setActivePastes(pastesWithUrl);
            })
            .catch(err => console.error(err));
    }, []);


    const submitPaste = async () => {
        const payload = {
            content: content,
            max_views: maxViews ? Number(maxViews) : null,
            expires_at: expiresAt ? new Date(expiresAt).toISOString() : null
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/paste/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            const newUrl = `http://localhost:5173/paste/${data.id}`;
            setPasteUrl(newUrl);

            
            setActivePastes(prev => [...prev, { id: data.id, url: newUrl }]);

            
            setContent("");
            setMaxViews("");
            setExpiresAt("");
        } catch (err) {
            console.error(err);
        }
    };

    
    return (
        <div className="app-container">
            <h2>Create Paste</h2>

            <textarea
                placeholder="Paste content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                type="number"
                placeholder="Max Views (optional)"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
            />

            <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
            />

            <button onClick={submitPaste}>Create Paste</button>

            
            {pasteUrl && (
                <div className="share-link">
                    Your new paste: <a href={pasteUrl} target="_blank" rel="noreferrer">View Paste</a>
                </div>
            )}

            <div className="links">
            <h3>Your Active Pastes</h3>
            <ul>
                {activePastes.length === 0 && <li>No active pastes</li>}
                {activePastes.map(paste => (
                    <li key={paste.id}>
                        <a href={paste.url} target="_blank" rel="noreferrer">
                            Link
                        </a>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

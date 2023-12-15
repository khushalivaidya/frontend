import "./App.css";
import RepoGrid from "./Components/RepoGrid";

function App() {
    return (
        <div className="app-page">
            <h1 style={{ textAlign: "center" }}>
                Most Popular Github Repositories
            </h1>
            <RepoGrid />
        </div>
    );
}

export default App;

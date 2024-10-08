import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfilePage() {
    const { user } = useSelector((store) => store.authReducer);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Профіль користувача</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
                <img
                    src={user.image}
                    alt="Profile"
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
            </div>
            <div style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
                <p>Ім'я: <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "200px" }}>{user.firstName}</span></p>
                <p>Прізвище: <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "200px" }}>{user.lastName}</span></p>
                <p>Електронна пошта: <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "200px" }}>{user.email}</span></p>
            </div>
            <Link to="/">
                <Button variant="contained" style={{ marginTop: "20px" }}>
                    Go home
                </Button>
            </Link>
        </div>
    );
}

export default ProfilePage;

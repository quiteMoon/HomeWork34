import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import { Button, TextField, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { signIn, googleLogin } = useAction();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            signIn(formData);
            navigate("/"); // Перенаправлення на MainPage
        } else {
            alert("Паролі не співпадають!");
        }
    };

    function googleOnSuccessHandler(credentials) {
        const jwtToken = credentials.credential;
        googleLogin(jwtToken);
        navigate("/"); // Перенаправлення на MainPage
    }

    function googleOnErrorHandler(error) {
        console.error(error);
    }

    return (
        <GoogleOAuthProvider clientId="887178122058-kuopeve8qvph8fuoh1a7jpgtem9npsmc.apps.googleusercontent.com">
            <div style={{ maxWidth: "400px", margin: "auto" }}>
                <Typography variant="h4" gutterBottom>Реєстрація</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Ім'я користувача"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Ім'я"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Призвище"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Електронна пошта"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Підтвердження паролю"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <div style={{ margin: "15px 0", width: "100%" }}>
                        <GoogleLogin
                            width="395"
                            onSuccess={googleOnSuccessHandler}
                            onError={googleOnErrorHandler}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Зареєструватись
                    </Button>
                </form>
            </div>
        </GoogleOAuthProvider>
    );
}

export default SignUpPage;

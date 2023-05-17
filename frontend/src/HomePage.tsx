import { Typography } from "@mui/material";

export default function HomePage() {
    return (
        <div>
            <Typography variant="h2" align="center" sx={{ marginTop: "40px" }}>
                Willkommen auf iitsFriiday!
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginTop: "16px" }}>
                Hier kannst du deine Releases verwalten und neue Alben erstellen.
            </Typography>
        </div>
    );
}

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const InfoCard = ({ description }: {description: string}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ maxWidth: 550, m: 2, p:2 }}> {/* Styling the card with a maximum width and margin */}
        <CardContent>
            <Typography variant="h4" color="green">
            {description} {/* Display the description */}
            </Typography>
        </CardContent>
        </Card>
    </Box>
  );
};

export default InfoCard;

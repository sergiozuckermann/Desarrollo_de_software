// IMPORTS FOR: card, card-content, typography and box
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define the InfoCard component with a prop for description
const InfoCard = ({ description }: {description: string}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
        {/* Card component with styling */}
        <Card sx={{ maxWidth: 550, m: 2, p:2 }}>
            <CardContent>
                {/* Typography component to display the description */}
                <Typography variant="h4" color="green">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    </Box>
  );
};

export default InfoCard; 


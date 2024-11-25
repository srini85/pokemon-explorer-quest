import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Grid } from '@mui/material';

const TriviaCard = ({ question, submitAnswer }) => {
    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="140"
                image={question.pokemon.sprite}
                alt={question.pokemon.name}
                sx={{
                    objectFit: 'contain',
                    width: '100%',
                }}
            />
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {question.question}
                </Typography>
                <Grid container spacing={2}>
                    {question.options.map((option, index) => (
                        <Grid item xs={6} key={index}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => submitAnswer(option)}
                            >
                                {option}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default TriviaCard;

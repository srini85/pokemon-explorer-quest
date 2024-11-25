import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';

const Inventory = ({ caught, onSelectPokemon }) => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Your Pokémon Inventory
            </Typography>
            <Grid container spacing={2}>
                {caught.map((poke, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardMedia
                                component="img"
                                height="120"
                                image={poke.sprite}
                                alt={poke.name}
                                sx={{
                                    objectFit: 'contain',
                                    width: '100%',
                                }}
                            />
                            <CardContent>
                                <Typography variant="subtitle1">{poke.name}</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => onSelectPokemon(poke)}
                                >
                                    Select to Train
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Inventory;

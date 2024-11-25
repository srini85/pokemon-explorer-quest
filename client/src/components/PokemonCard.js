import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const PokemonCard = ({ pokemon }) => {
    return (
        <Card sx={{ maxWidth: 300, margin: '20px auto', textAlign: 'center' }}>
            <CardMedia
                component="img"
                height="140"
                image={pokemon.sprite}
                alt={pokemon.name}
                sx={{
                    objectFit: 'contain',
                    width: '100%',
                }}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {pokemon.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PokemonCard;

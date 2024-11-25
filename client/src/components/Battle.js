import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const Battle = ({ selectedPokemon, opponent, onBattleResult }) => {
    const [battleOutcome, setBattleOutcome] = useState(null);

    const battle = () => {
        // Simple battle logic: compare the Pokémon's names or stats
        const playerPower = Math.random() * 100; // Simulating player power
        const opponentPower = Math.random() * 100; // Simulating opponent power

        if (playerPower > opponentPower) {
            setBattleOutcome('You won the battle!');
            onBattleResult(selectedPokemon, true); // Player won
        } else {
            setBattleOutcome('You lost the battle!');
            onBattleResult(selectedPokemon, false); // Player lost
        }
    };

    return (
        <Card sx={{ marginTop: '20px', maxWidth: 400, margin: '0 auto' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Battle: {selectedPokemon.name} vs. {opponent.name}
                </Typography>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="body1">Your Pokémon:</Typography>
                    <Typography variant="body2">{selectedPokemon.name}</Typography>
                    <Typography variant="body2">Level: {selectedPokemon.level}</Typography>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="body1">Opponent:</Typography>
                    <Typography variant="body2">{opponent.name}</Typography>
                    <Typography variant="body2">Level: {opponent.level}</Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={battle} sx={{ marginBottom: '10px' }}>
                    Fight!
                </Button>
                {battleOutcome && <Typography variant="h6" color={battleOutcome.includes('won') ? 'green' : 'red'}>{battleOutcome}</Typography>}
            </CardContent>
        </Card>
    );
};

export default Battle;

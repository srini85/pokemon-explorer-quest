import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box } from '@mui/material';
import TriviaCard from './components/TriviaCard';
import PokemonCard from './components/PokemonCard';
import Inventory from './components/Inventory';
import Battle from './components/Battle';

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [question, setQuestion] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [caught, setCaught] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [battleOpponent, setBattleOpponent] = useState(null);

    const getQuestion = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pokemon/question');
            setQuestion(response.data);
            setFeedback('');
            setPokemon(null);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const submitAnswer = (option) => {
        if (option === question.answer) {
            setFeedback('Correct! You caught the Pokémon!');
            setCaught((prevCaught) => {
                if (!prevCaught.some((poke) => poke.name === question.pokemon.name)) {
                    return [...prevCaught, { ...question.pokemon, level: 1 }];
                }
                return prevCaught;
            });
        } else {
            setFeedback('Wrong answer! Try again.');
        }
        setPokemon(question.pokemon);
        setQuestion(null);
    };

    const handlePokemonSelection = (poke) => {
        setSelectedPokemon(poke);

        // Generate a random opponent for the battle
        const opponent = {
            name: 'Wild Pokémon', // You can modify this to pull random Pokémon from the API or predefined list
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            level: Math.floor(Math.random() * 100) + 1,
        };

        setBattleOpponent(opponent);
    };

    const handleBattleResult = (poke, didWin) => {
        if (didWin) {
            setCaught(caught.map((p) => {
                if (p.name === poke.name) {
                    return { ...p, level: p.level + 1 }; // Level up the Pokémon
                }
                return p;
            }));
        }
        setSelectedPokemon(null);
        setBattleOpponent(null);
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Pokémon Explorer Quest
            </Typography>
            <Button variant="contained" color="primary" onClick={getQuestion}>
                Get a Trivia Question
            </Button>

            {question && <TriviaCard question={question} submitAnswer={submitAnswer} />}
            {feedback && (
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="body1" color={feedback.includes('Correct') ? 'green' : 'red'}>
                        {feedback}
                    </Typography>
                </Box>
            )}
            {pokemon && <PokemonCard pokemon={pokemon} />}
            {caught.length > 0 && (
                <Inventory caught={caught} onSelectPokemon={handlePokemonSelection} />
            )}
            {selectedPokemon && battleOpponent && (
                <Battle
                    selectedPokemon={selectedPokemon}
                    opponent={battleOpponent}
                    onBattleResult={handleBattleResult}
                />
            )}
        </Container>
    );
}

export default App;

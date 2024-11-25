const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// Get random Pokémon data
app.get('/api/pokemon/random', async (req, res) => {
    try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const { name, sprites, types } = response.data;

        res.json({
            name,
            sprite: sprites.front_default,
            types: types.map(type => type.type.name),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Pokémon data' });
    }
});

// Get Pokémon by type
app.get('/api/pokemon/type/:type', async (req, res) => {
    const { type } = req.params;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemonList = response.data.pokemon.map(p => p.pokemon.name);

        res.json({ type, pokemonList });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Pokémon by type' });
    }
});

app.get('/api/pokemon/question', async (req, res) => {
    try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Random Pokémon ID
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const { name, types, height, weight, abilities, stats } = response.data;

        // Randomly choose a question type
        const questionType = Math.floor(Math.random() * 4);
        let question, options, answer;

        switch (questionType) {
            case 0: // Type-based question
                const type = types[0].type.name;
                question = `What is the primary type of ${name}?`;
                options = ['fire', 'water', 'grass', type];
                answer = type;
                break;

            case 1: // Height-based question
                question = `What is the height of ${name} (in decimeters)?`;
                const correctHeight = height.toString();
                options = [
                    correctHeight,
                    (height + 2).toString(),
                    (height - 1).toString(),
                    (height + 3).toString(),
                ];
                answer = correctHeight;
                break;

            case 2: // Weight-based question
                question = `What is the weight of ${name} (in hectograms)?`;
                const correctWeight = weight.toString();
                options = [
                    correctWeight,
                    (weight + 5).toString(),
                    (weight - 3).toString(),
                    (weight + 10).toString(),
                ];
                answer = correctWeight;
                break;

            case 3: // Abilities-based question
                const ability = abilities[0].ability.name;
                question = `Which of these is an ability of ${name}?`;
                options = ['pressure', 'levitate', ability, 'chlorophyll'];
                answer = ability;
                break;

            // You can add more cases for other Pokémon attributes.
        }

        // Shuffle options to avoid predictable patterns
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        res.json({
            question,
            options: shuffledOptions,
            answer,
            pokemon: {
                name,
                sprite: response.data.sprites.front_default,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error generating trivia question' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

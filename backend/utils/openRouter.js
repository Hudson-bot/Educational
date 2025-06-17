import axios from 'axios';

async function generateQuestionsFromSkills(githubLink, skills, prompt) {
    if (!process.env.OPENROUTER_API_KEY) {
        throw new Error('OPENROUTER_API_KEY is not configured');
    }

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a technical interviewer generating questions and providing feedback."
                    },
                    {
                        role: "user",
                        content: prompt || `Generate 5 technical interview questions based on these skills: ${skills.join(', ')}`
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            }
        );

        if (!response.data?.choices?.[0]?.message?.content) {
            console.error('Unexpected API response format:', response.data);
            throw new Error('Invalid response format from OpenRouter API');
        }

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenRouter API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw new Error(`Failed to generate content: ${error.message}`);
    }
}

export default generateQuestionsFromSkills;
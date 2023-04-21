import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export async function getAnecdotes() {
  const response = await axios.get(baseUrl);
  return response.data;
}

export async function createAnecdote(anecdote) {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
}

export async function addVote(anecdote) {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
}

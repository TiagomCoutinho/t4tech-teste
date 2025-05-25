import axios from 'axios'

export interface Team {
    id: number;
    conference: string;
    division: string;
    city: string;
    name: string;
    full_name: string;
    abbreviation: string;
}

export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string;
    weight: string;
    jersey_number: string;
    college: string;
    country: string;
    draft_year: number | null;
    draft_round: number | null;
    draft_number: number | null;
    team: Team;
}

const requestOptions = (endpoint: string, method: string) => {
    return {
        url: `https://api.balldontlie.io/v1/${endpoint}`,
        method: method,
        headers: {
            "Authorization": process.env.BALL_DONT_LIE_API_KEY || ""
        }
    }
}

export const getPlayers = async () => await axios.request(requestOptions('players?per_page=100', 'GET'));

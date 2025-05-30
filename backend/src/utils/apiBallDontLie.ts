import axios from 'axios'

export interface Team {
    id?: number;
    conference?: string;
    division?: string;
    city?: string;
    name?: string;
    full_name: string;
    abbreviation?: string;
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

export const getPlayers = async () => await axios.get('https://api.balldontlie.io/v1/players?per_page=100', {
    headers: {
        "Authorization": process.env.BALL_DONT_LIE_API_KEY || ""
    }
});

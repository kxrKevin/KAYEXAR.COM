// lib/spotify.ts
let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getSpotifyAccessToken() {
  // If cached token is still valid, use it
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  if (!res.ok) throw new Error('Failed to get Spotify token');
  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60_000; // refresh 1 min early

  return cachedToken;
}

export async function getArtistAlbums() {
  const accessToken = await getSpotifyAccessToken();
  const artistId = process.env.SPOTIFY_ARTIST_ID!;

  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error('Failed to fetch artist albums');
  return res.json();
}

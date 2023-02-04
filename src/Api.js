async function fetchNextEpisodes(profileName) {
    let anime = []

    if(!profileName)
        return anime;

    await fetch(`http://localhost:3001/watchListNextEps/${profileName}`, { method: 'Get' })
        .then(res => {
            anime = res.json();
        })
        .catch(err => {
            console.error(err);
        });

    return anime;
}

export { fetchNextEpisodes };
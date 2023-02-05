async function fetchNextEpisodes(profileName) {
    let anime = []

    if(!profileName)
        return anime;

    await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/watchListNextEps/${profileName}`, { method: 'Get' })
        .then(res => {
            anime = res.json();
        })
        .catch(err => {
            console.error(err);
        });

    return anime;
}

export { fetchNextEpisodes };
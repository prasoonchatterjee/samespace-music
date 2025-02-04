import { useEffect, useState } from 'react';
import axios from 'axios';
import SongItem from './SongItem';
import Player from './Player';
import spotifyLogo from '../spotify_logo.png';
import burgerIcon from '../burgerMenu.svg';
import crossIcon from '../cross.png';
import spinIcon from '../spin.svg';

const Home = () => {
  const [songsList, setSongsList] = useState([]);
  const [tab, setTab] = useState(1);
  const [selectedSongUrl, setSelectedSongUrl] = useState('');
  const [searchSong, setSearchSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [toggleBurger, setToggleBurger] = useState(false);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'https://cms.samespace.com/items/songs'
        );
        const songs = response.data.data;
        if (songs.length) {
          setSongsList(songs);
          setSelectedSong(songs[0]);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    }
    fetchSongs();
  }, []);

  const renderSongs = () => {
    const topSongs = songsList.filter((song) => song.top_track);
    if (searchSong) {
      if (tab === 2) {
        const filteredSongs = topSongs.filter(
          (song) =>
            song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchSong.toLowerCase())
        );
        return filteredSongs.map((song) => (
          <SongItem
            song={song}
            key={song.id}
            setSelectedSongUrl={setSelectedSongUrl}
            setSelectedSong={setSelectedSong}
          />
        ));
      } else {
        const searchSongs = songsList.filter(
          (song) =>
            song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchSong.toLowerCase())
        );
        return searchSongs.map((song) => (
          <SongItem
            song={song}
            key={song.id}
            setSelectedSongUrl={setSelectedSongUrl}
            setSelectedSong={setSelectedSong}
          />
        ));
      }
    } else if (tab === 2) {
      return topSongs.map((song) => (
        <SongItem
          song={song}
          key={song.id}
          setSelectedSongUrl={setSelectedSongUrl}
          setSelectedSong={setSelectedSong}
        />
      ));
    } else
      return songsList.map((song) => (
        <SongItem
          song={song}
          key={song.id}
          setSelectedSongUrl={setSelectedSongUrl}
          setSelectedSong={setSelectedSong}
        />
      ));
  };
  const changeTab = (num) => {
    setTab(num);
    setSearchSong('');
  };

  if (error) return <p>something went wrong</p>;
  else if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div>
          <img src={spinIcon} className='animate-spin' alt="loading spinner" />
        </div>
      </div>
    );
  } else
    return (
      <main
        className={`flex text-white h-screen flex-col md:flex-row transition-colors ease-in-out duration-1000`}
        style={{ backgroundColor: selectedSong?.accent }}
      >
        <img
          src={toggleBurger ? crossIcon : burgerIcon}
          className='md:hidden w-10 p-1'
          onClick={() => setToggleBurger(!toggleBurger)}
          alt="burger or cross icon"
        />
        <div className={` basis-1/6 p-2 hidden md:block `}>
          <img src={spotifyLogo} className='w-32 ml-4 mt-4' alt="spotify logo" />
        </div>
        <div
          className={` p-6 md:basis-1/3 md:flex md:flex-col md:mt-2 ${
            toggleBurger ? '' : 'hidden'
          }`}
        >
          <header className='font-bold flex cursor-pointer justify-around md:justify-start'>
            <div
              onClick={() => changeTab(1)}
              className='hover:scale-150 transform-all duration-1000'
            >
              For You
            </div>
            <div
              onClick={() => changeTab(2)}
              className='ml-10 hover:scale-150 transform-all duration-1000'
            >
              Top Tracks
            </div>
          </header>
          <input
            className='w-full border border-black rounded-md mt-6 p-2 text-black'
            placeholder='Search Song, Artist'
            value={searchSong}
            onChange={(e) => setSearchSong(e.target.value)}
          />
          <div className='mt-6'>{renderSongs()}</div>
        </div>
        <div
          className={`flex justify-center md:mt-16 md:basis-1/2 ${
            toggleBurger ? 'hidden' : ''
          }`}
        >
          <Player url={selectedSongUrl} selectedSong={selectedSong} />
        </div>
      </main>
    );
};

export default Home;

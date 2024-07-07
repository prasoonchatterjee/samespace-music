import { useEffect, useState } from 'react';
import axios from 'axios';
import SongItem from './SongItem';
import Player from './Player';
import spotifyLogo from '../spotify_logo.png';
import burgerMenu from '../burgerMenu.svg';

const Mobile = () => {
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
          setSelectedSong(songs[0])
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
  console.log('selectedSong', selectedSong)

  if (isLoading) return <p>Loading....</p>;
  else if (error) return <p>something went wrong</p>;
  else if(toggleBurger) return (
    <div>
      <header className='bg-green-500 flex items-center'>
      <img src={burgerMenu} className='md:hidden w-8 bg-green-500' onClick={()=>setToggleBurger(!toggleBurger)}/>
        <div className="ml-4" onClick={() => changeTab(1)}>For You</div>
        <div className="ml-4" onClick={() => changeTab(2)}>Top Tracks</div>
      </header>
      {renderSongs()}
      {/* <Player url={selectedSongUrl} selectedSong={selectedSong} className='bg-yellow-500' /> */}
    </div>
  )
  else if(!toggleBurger) return (
    <div>
      <img src={burgerMenu} className='md:hidden w-8 bg-green-500' onClick={()=>setToggleBurger(!toggleBurger)}/>
      <Player url={selectedSongUrl} selectedSong={selectedSong} className='bg-yellow-500' />
    </div>
  )
  else
    return (
      <main className='flex text-white h-screen bg-blue-500'>
        <div className='bg-blue-300 basis-1/6 p-2 hidden md:visible'>
          <img src={spotifyLogo} />
        </div>
        <div className='bg-red-500 basis-1/3 p-2 hidden md:visible'>
          <header className='bg-green-500 flex'>
            <div onClick={() => changeTab(1)}>For You</div>
            <div onClick={() => changeTab(2)}>Top Tracks</div>
          </header>
          <input
            className='w-full border border-black rounded-md'
            placeholder='Search Song, Artist'
            value={searchSong}
            onChange={(e) => setSearchSong(e.target.value)}
          />
          {renderSongs()}
        </div>
        <div className='bg-yellow-500 lg:basis-1/2 '>
        <img src={burgerMenu} className='md:hidden w-8' onClick={()=>setToggleBurger(!toggleBurger)}/>
          <Player url={selectedSongUrl} selectedSong={selectedSong} className='bg-yellow-500' />
        </div>
      </main>
    );
};

export default Mobile;

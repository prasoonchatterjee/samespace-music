const SongItem = (props) => {
  const { name, artist, cover } = props.song;
  return (
    <div
      onClick={() => props.setSelectedSong(props.song)}
      className='cursor-pointer  flex justify-between p-1 transition-all duration-300 hover:scale-105 hover:p-2 hover:bg-green-500 hover:text-black  rounded-xl'
    >
      <div className='flex'>
        <img
          src={`https://cms.samespace.com/assets/${cover}`}
          className='w-12 h-12 rounded-full'
          alt="music cover"
        />
        <div className='ml-2'>
          <p>{name}</p>
          <p className='text-xs'>{artist}</p>
        </div>
      </div>
      <p className='self-center'>4:30</p>
    </div>
  );
};

export default SongItem;

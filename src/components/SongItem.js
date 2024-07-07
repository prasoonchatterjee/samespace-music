const SongItem = (props) => {
  const { name, artist, cover, url } = props.song;
  // console.log('props', props);
  return (
    <div
      onClick={() => props.setSelectedSong(props.song)}
      className='cursor-pointer  flex justify-between p-1'
    >
      <div className='flex'>
        <img
          src={`https://cms.samespace.com/assets/${cover}`}
          className='w-12 h-12 rounded-full'
        />
        <div className="ml-2">
          <p className="">{name}</p>
          <p className="text-xs">{artist}</p>
        </div>
      </div>
      <p className="self-center">4:30</p>
    </div>
  );
};

export default SongItem;

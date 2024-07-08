import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = (props) => {
  if (props.selectedSong?.url)
    return (
      <div className='p-6'>
        <div className='m-0'>
          <p className='text-xl'>{props.selectedSong?.name}</p>
          <p className='text-xs mt-2'>{props.selectedSong?.artist}</p>
        </div>
        <div className=' mt-4'>
          <img
            src={`https://cms.samespace.com/assets/${props.selectedSong.cover}`}
            className='border rounded-xl object-fill h-96 w-96'
            alt="music cover"
          />
        </div>
        <AudioPlayer
          style={{
            backgroundColor: props.selectedSong?.accent,
            boxShadow: 'none',
          }}
          src={props.selectedSong.url}
          className='mt-4 text-white transition-colors ease-in-out duration-1000'
          autoPlayAfterSrcChange={true}
          customControlsSection={[
            <div></div>,
            RHAP_UI.MAIN_CONTROLS,
            <div></div>,
          ]}
        />
      </div>
    );
  else return null;
};

export default Player;

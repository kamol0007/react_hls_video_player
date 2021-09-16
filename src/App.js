import React from 'react';
import HlsPlayer from './HlsPlayer';


function App() {
    const video_url = "https://prep.uz/video/source/SWcYsjW9WBeJOFAAot46Uw/1631818105/3659/ebkWeZNrE64MNxnBKCYeMF7uKCkCR3UcaRzKv0Uf/enc/playlist.m3u8";
    return (
		<div style={{width: 700}}>
			<HlsPlayer video_url={video_url}/>
		</div>
    );
}
export default App;

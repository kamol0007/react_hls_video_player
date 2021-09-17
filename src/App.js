import React, {useState}from 'react';
import HlsPlayer from './HlsPlayer';


const App = () => {
    const [url, setUrl] = useState("https://prep.uz/video/source/i0NjPNJQocD_ytKQjbFlLA/1631902349/3659/ebkWeZNrE64MNxnBKCYeMF7uKCkCR3UcaRzKv0Uf/enc/playlist.m3u8");
    const [input, setInput] = useState('');
    return (
        <div style={{width: 700, margin: 'auto', padding: 10}}>
            <div style={{width: 700}}>
                <HlsPlayer file={url}/>
            </div>
            <div style={{margin: 10}}>
                <input type="text" name="file" value={input} onChange={e=>setInput(e.target.value)} style={{width: 600}}/>
                <button onClick={()=>setUrl(input)}>Load</button>
            </div>
        </div>
    );
}
export default App;

import React, { Component } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import 'plyr/dist/plyr.css';


class Player extends Component {
    state = {};
    componentDidMount() {
        if (Hls.isSupported() && this.player) {
            const video = this.player;
            const source = video.getElementsByTagName("source")[0].src;
            const defaultOptions = {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings',  'airplay', 'fullscreen'],
                settings: ['quality']
            };
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(source);
                hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                    const availableQualities = hls.levels.map((l) => l.height)
                    defaultOptions.quality = {
                        default: availableQualities[0],
                        options: availableQualities,
                        forced: true,        
                        onChange: (e) => updateQuality(e),
                    }
                    const player = new Plyr(video, defaultOptions);
                });
                hls.attachMedia(video);
                window.hls = hls;
            } else {
                const player = new Plyr(video, defaultOptions);
            }
            function updateQuality(newQuality) {
                window.hls.levels.forEach((level, levelIndex) => {
                    if (level.height === newQuality) {
                        console.log("Found quality match with " + newQuality);
                        window.hls.currentLevel = levelIndex;
                    }
                });
            }
        }
    }
    render() {
        return (<>
            <style jsx>{`
                :root {
                    --plyr-color-main: #5254f1!important;
                }
            `}</style>
            <video
                preload="none"
                className="videoCanvas"
                ref={player => (this.player = player)}
                width="100%"
                height="auto"
                controls crossorigin playsinline 
            >
                <source 
                    type="application/x-mpegURL" 
                    src={this.props.video_url}
                >
                </source>
            </video>
        </>);
    }
}
export default Player;
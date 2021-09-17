import React, { useEffect, useRef } from 'react';
import Hls from "hls.js";
import Plyr from "plyr";
import 'plyr/dist/plyr.css';
import Poster from './video-poster.png';


const Player = ({ file = '' }) => {
	const ref = useRef(null);
	const player = useRef(null);
	const setPLayer = () => {
		const src = file;
		const defaultOptions = {
			controls: [
				'play-large',
				'play',
				'progress',
				'current-time',
				'mute',
				'volume',
				'captions',
				'settings',
				'airplay',
				'fullscreen',
			],
			settings: ['quality'],
		};
		if (Hls.isSupported() && ref.current) {
			const updateQuality = newQuality => {
				window.hls.levels.forEach((level, levelIndex) => {
					if (level.height === newQuality) {
						window.hls.currentLevel = levelIndex;
					}
				});
			};
			const hls = new Hls();
			hls.loadSource(src);
			hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
				const availableQualities = hls.levels.map(l => l.height);
				defaultOptions.quality = {
					default: availableQualities[0],
					options: availableQualities,
					forced: true,
					onChange: e => updateQuality(e),
				};
				player.current = new Plyr(ref.current, defaultOptions);
			});
			hls.attachMedia(ref.current);
			window.hls = hls;
		} else {
			player.current = new Plyr(ref.current, defaultOptions);
		}
	};
	useEffect(() => {
		setPLayer();
	}, [file]);
	return (
		<div>
            <style jsx>{`
                :root {
                    --plyr-color-main: #5254f1!important;
                }
            `}</style>
			<video
				preload="none"
				className="videoCanvas"
				ref={ref}
				width="100%"
				height="auto"
				controls
				src={file}
				poster={Poster}
				crossOrigin
				playsInline/>
		</div>
	);
};
export default Player;
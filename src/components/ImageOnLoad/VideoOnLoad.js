import React from 'react';
import * as PropTypes from 'prop-types';
import ClassNames from 'classnames';
import thumbnail from '../../assets/thumbnail.webp';
import { mediaReference } from '../../utils/ipfs';

const VideoOnLoad = (props) => {
    const [poster, setPoster] = React.useState(null);

    React.useEffect(() => {
        setPoster(null);
        if (props.preview) {
            const url = mediaReference(props.preview);
            const image = new Image();
            image.onload = () => {
                setPoster(url);
            };
            image.onerror = () => {
                setPoster(props.preview);
            };
            image.src = url;
        }
    }, [props.preview]);

    if (poster) {
        return (
            <video
                loop muted playsInline className={ClassNames('inline_video', props.className)}
                controls={props.controls || false}
                controlsList={props.controls
                    ? 'nodownload noplaybackrate'
                    : false}
                disablePictureInPicture={props.controls || false}
                id="video-background"
                poster={poster}>
                <source src={props.src} type={props.type || 'video/mp4'}/>
            </video>
        );
    }

    return (
        <video
            loop muted playsInline className={ClassNames('inline_video', props.className)}
            controls={props.controls || false}
            controlsList={props.controls
                ? 'nodownload noplaybackrate'
                : false}
            disablePictureInPicture={props.controls || false}
            id="video-background"
            poster={thumbnail}>
            <source src={props.src} type={props.type || 'video/mp4'}/>
        </video>
    );
};

VideoOnLoad.propTypes = {
    className: PropTypes.string,
    controls: PropTypes.bool,
    preview: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.string,
};

export default VideoOnLoad;

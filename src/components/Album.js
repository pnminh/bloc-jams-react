import React, { Component } from "react";
import albumData from "./data/albums";
import PlayerBar from "./PlayerBar";
import "./../Album.css"
import {formatTime} from './Utility'
class Album extends Component {
    constructor(props) {
        super(props);
        const album = albumData.find(album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovered: null,
            currentTime: 0,
            duration: album.songs[0].duration,
            currentVolume: 0.8
        }

        this.audioElement = document.createElement("audio");
        this.audioElement.src = album.songs[0].audioSrc;
        this.audioElement.volume = 0.8;
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false })
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause()
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handleMouseLeave(index) {
        this.setState({ isHovered: null })
    }

    handleMouseOver(index) {
        this.setState({ isHovered: index });
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
        const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play()
    }
    eventListeners = {
        audioTimeupdate: () => {
            this.setState({ currentTime: this.audioElement.currentTime });
        },
        audioDurationchange: () => {
            this.setState({ duration: this.audioElement.duration });
        }
    };
    componentDidMount() {
        console.log("mounted component")
        this.audioElement.addEventListener('timeupdate', this.eventListeners.audioTimeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.audioDurationchange)
    }
    componentWillUnmount() {
        console.log("going to unmount component")
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate',this.eventListeners.audioTimeupdate);
        this.audioElement.removeEventListener('durationchange',this.eventListeners.audioDurationchange);
    }
    handleTimeChange = (e) => {
        let newCurrentTime = e.target.value * this.state.duration;
        this.audioElement.currentTime = newCurrentTime;
        this.setState({ currentTime: newCurrentTime });
    }
    handleVolumeChange = (e) => {
        let newCurrentVolume = e.target.value/100;
        this.audioElement.volume = newCurrentVolume;
        this.setState({ currentVolume: newCurrentVolume })
    }
    renderButton(song, index) {
        if (song === this.state.currentSong) {
            if (this.state.isPlaying === true) {
                return <span className="ion-pause"></span>
            }
            else {
                return <span className="ion-play"></span>
            }
        }
        else {
            if (this.state.isHovered !== null && this.state.isHovered === index) {
                return <span className="ion-play"></span>
            } else { return <span> {index + 1}</span> }
        }
    }

    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>

                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>

                    <tbody>
                        {
                            this.state.album.songs.map((song, index) =>
                                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseOver={() => this.handleMouseOver(index)} onMouseLeave={() => this.handleMouseLeave()} >

                                    <td>{this.renderButton(song, index)}</td>
                                    <td>{song.title}</td>
                                    <td>{formatTime(song.duration)} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={this.handleTimeChange.bind(this)}
                    handleVolumeChange={this.handleVolumeChange.bind(this)}
                    currentTime={this.state.currentTime}
                    duration={this.state.duration}
                    currentVolume={this.state.currentVolume}
                />
            </section>
        );
    }
}

export default Album;
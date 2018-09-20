import React, {Component} from "react";
import albumData from "./data/albums";
import PlayerBar from "./PlayerBar";
import "./../Album.css"

class Album extends Component{
    constructor(props){
        super(props);
        this.indexRef = [];
    const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
    });

    this.state = {
        album: album,
        currentSong: album.songs[0],
        isPlaying: false,
        isHovered: null
    }

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause() {
        this.audioElement.pause();
        this.setState({isPlaying: false})
    }

    setSong(song){
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song});
    }

    handleSongClick(event,song,index){
        this.indexRef[index].className=(this.indexRef[index].className === "ion-play")?"ion-pause":"ion-play"
        if(this.state.currentSong !== this.state.album.songs[index]){
            for(var i in this.state.album.songs){
                if(this.state.album.songs[i] === this.state.currentSong){
                    this.indexRef[i].innerHTML = parseInt(i,10)+1
                    this.indexRef[i].className = null
                }
            }
        }
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong){
            this.pause()
        } else{
            if (!isSameSong) { this.setSong(song); } 
            this.play();
        }
    }
<<<<<<< HEAD
    onMouseOverHandler(event,index){
        /* if(this.state.currentSong !== this.state.album.songs[index]){
            this.indexRef[index].className=(this.indexRef[index].className === "ion-play")?"ion-pause":"ion-play"
        }else{
            if(this.state.isPlaying === false && this.indexRef[index].innerHTML){
                this.indexRef[index].className = "ion-play"
            }
        }
        this.indexRef[index].innerHTML = null */
        if(this.indexRef[index].innerHTML){
            this.indexRef[index].className="ion-play"
            this.indexRef[index].innerHTML = null
        }
        
        //event.target.className=(event.target.className === "ion-play")?"ion-pause":"ion-play"
    }
    onMouseLeaveHandler(event,index){
        if(this.state.currentSong !== this.state.album.songs[index]){
            this.indexRef[index].className=null;
            this.indexRef[index].innerHTML = index+1
        }
        //event.target.className=(event.target.className === "ion-play")?"ion-pause":"ion-play"
    }
    render() {
        return(
            <section className="album">
                <section id="album-info">
=======
    
    handleMouseLeave(index){
        this.setState({isHovered: null})
    }

    handleMouseOver(index){
      this.setState({isHovered: index});  
    }
>>>>>>> e14f4c00aa9d02162469731e8273abe15aaee352

    handlePrevClick(){
        const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
        const newIndex = Math.max(0, currentIndex-1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
        const newIndex = Math.min(this.state.album.songs.length,currentIndex+1,);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play()
    }

    renderButton(song, index){
        if (song === this.state.currentSong){
            if( this.state.isPlaying === true){
                return <span className="ion-pause"></span>
            }
            else{
                return <span className="ion-play"></span> }
        }
        else{
            if(this.state.isHovered !== null && this.state.isHovered === index){
                return  <span className="ion-play"></span> 
            }else
            { return <span> {index+1}</span>}
        }  
    }

<<<<<<< HEAD
                  <tbody>
                      {
                          this.state.album.songs.map((song, index) =>
                          <tr className="song" key={index} onClick={(event) => this.handleSongClick(event,song,index)} onMouseOver={(event)=>this.onMouseOverHandler(event,index)} onMouseLeave={(event)=>this.onMouseLeaveHandler(event,index)}>
                            <td><span ref={(a) => { this.indexRef[index] = a }}>{index +1}</span></td> 
                            <td>{song.title}</td>
                            <td>{song.duration} </td>
                        </tr>
                       
                    )
                    }
                  </tbody>
                  
                </table>
            </section>
=======
    render() {
      return(
        <section className="album">
          <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
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
                    <td>{song.duration} </td>
                    </tr>     
                )
                }
            </tbody>  
          </table>
          
          <PlayerBar 
            isPlaying={this.state.isPlaying} 
            currentSong={this.state.currentSong} 
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={()=> this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            />
        </section>
>>>>>>> e14f4c00aa9d02162469731e8273abe15aaee352
        );
    }
}

export default Album;
import React, {Component} from "react";
import albumData from "./data/albums";

class Album extends Component{
    constructor(props){
        super(props);
    
    const album = albumData.find( album => {
        return album.slug === this.props.match.params.slug
    });

    this.state = {
        album2: album
    }

    }
    render(){
        return(
            <section className="album">
                <section id="album-info">

                <img id="album-cover-art" src={this.state.album2.albumCover} alt={this.state.album2.title}/>

                <div className="album-details">
                    <h1 id="album-title">{this.state.album2.title}</h1>
                    <h2 className="artist">{this.state.album2.artist}</h2>
                    <div id="release-info">{this.state.album2.releaseInfo}</div>
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
                          this.state.album2.songs.map((albu, index) =>
                        <tr key = {index}>
                            <td>{index +1} </td> 
                            <td>{albu.title}</td>
                            <td>{albu.duration} </td>
                        </tr>
                       
                    )
                    }
                  </tbody>
                  
                </table>
            </section>
        );
    }
}

export default Album;
import React from "react";
import { Link } from "react-router-dom";

class Game extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: [],
            color: [],
            space1: 0,
            space2: 0,
            space3: 0,
            space4: 0
        }
    }

    // mmemo
    // マス目にクラスをつけて、マスごとにどっちに移動するかanimationをつける

    render(){

        //ローカルストレージに値がない場合の処理
        let getStorage;
        const storage = localStorage.getItem('name1');
        if (storage == null) {
            getStorage = true;
        } else {
            getStorage = false;
        }


        //ローカルストレージから情報を取得 
        const test = () => {
            const name = Object.keys(localStorage).filter(key => /^name/.test(key)).map(key => localStorage.getItem(key));
            const color = Object.keys(localStorage).filter(key => /^color/.test(key)).map(key => localStorage.getItem(key));
            this.setState({
                name: name,
                color: color
            });

            const gameContainer = document.getElementById('game-container');
            gameContainer.style.display = 'block';
        };
        

        const textColor = document.getElementsByClassName('text-color');
        for(let i=0; i<this.state.name.length; i++){
            textColor[i].style.color = this.state.color[i];
        }


        return(
            <div>
                {getStorage ? 

                    <div className="null-content">
                        <div>
                            <p>設定からやりなおしてね</p>
                            <Link to={'/setting'} className="btn">せっていへ</Link>
                        </div>
                    </div>

                    : 

                    <div>

                        <div className="rule-content">

                            <div>
                                <h3>ルール</h3>
                                <p>先にゴールしたほうがかち！がんばって！</p>
                                <button type="button" className="btn" onClick={()=>{test()}}>
                                    start
                                </button>
                            </div>
                            
                        </div>

                        <div id="game-container">
                            <p className="text-color">{this.state.name[0]}</p>
                            <p className="text-color">{this.state.name[1]}</p>
                        </div>
                    
                    </div>
                }
                
            </div>
        )
    }
}

export default Game
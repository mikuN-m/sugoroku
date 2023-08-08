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

    componentDidMount(){
        const name = Object.keys(localStorage).filter(key => /^name/.test(key)).map(key => localStorage.getItem(key));
        const color = Object.keys(localStorage).filter(key => /^color/.test(key)).map(key => localStorage.getItem(key));
        this.setState({
            name: name,
            color: color
        });
    }

    // memo
    // マス目にクラスをつけて、マスごとにどっちに移動するかanimationをつける
    // その人の番のとき、名前等を強調する

    render(){

        //ローカルストレージに値がない場合の処理
        let getStorage;
        const storage = localStorage.getItem('name1');
        if (storage == null) {
            getStorage = true;
        } else {
            getStorage = false;
        }


        //名前表示
        const nameShow = [];
        const player = [];
        const test = () => {
            const gameContainer = document.getElementById('game-container');
            const ruleContent = document.getElementById('rule-content');
            gameContainer.style.display = 'block';
            ruleContent.style.display = 'none';
        };
        
        for(let i=0; i<this.state.name.length; i++){
            nameShow.push(
                <p>
                    <span>{i + 1}.</span>
                    <span style={{color: this.state.color[i]}}>{this.state.name[i]}</span>
                </p>
            );
            player.push(
                <div className="player" id={`player${i+1}`} style={{backgroundColor: this.state.color[i]}}>
                    {this.state.name[i]}
                </div>
            );
        }


        //ランダムさいころ
        const diceImgs = ['dice1.png','dice2.png','dice3.png','dice4.png','dice5.png','dice6.png'];
        const diceRandom = () => {
            const diceNam = Math.floor(Math.random() * diceImgs.length);
            const diceBox = document.getElementsByClassName('dice-img');

            diceBox[0].style.backgroundImage = `url(${diceImgs[diceNam]})`;
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

                        <div id="rule-content">

                            <div>
                                <h1>ルール</h1>
                                <p>先にゴールしたほうがかち！がんばって！</p>
                                <button type="button" className="btn" onClick={()=>{test()}}>
                                    start
                                </button>
                            </div>
                            
                        </div>


                        


                        <div id="game-container">

                            {player}

                            <div className="name-box">

                                {nameShow}

                            </div>

                            <div className="dice-content">

                                <button className="btn" onClick={()=>{diceRandom()}}>ダイスを振る</button>

                                <div className="dice-img">
                                    
                                </div>

                            </div>

                            <div className="game-space-content">

                                <div className="space-box">
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                </div>

                                <div className="space-box right">
                                    <div className="space"></div>
                                </div> 

                                <div className="space-box">
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                </div>

                                <div className="space-box left">
                                    <div className="space"></div>
                                </div> 

                                <div className="space-box">
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                    <div className="space"></div>
                                </div>

                            </div>                            

                        </div>
                    
                    </div>
                }
                
            </div>
        )
    }
}

export default Game
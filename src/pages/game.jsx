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

    // mmemo
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


        //
        const nameShow = [];
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

                            <div className="name-box">

                                {nameShow}

                            </div>

                        </div>
                    
                    </div>
                }
                
            </div>
        )
    }
}

export default Game
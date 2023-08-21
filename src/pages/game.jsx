import React from "react";
import { Link } from "react-router-dom";

class Game extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: [],
            color: [],
            x: 0,
            y: 0,
            space: [0,0,0,0]
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
        const start = () => {
            const gameContainer = document.getElementById('game-container');
            const ruleContent = document.getElementById('rule-content');
            gameContainer.style.display = 'block';
            ruleContent.style.display = 'none';

            setTimeout(()=>{
                step1();
            },1000)
        };
        
        for(let i=0; i<this.state.name.length; i++){
            nameShow.push(
                <p>
                    <span>{i + 1}.</span>
                    <span style={{color: this.state.color[i]}}>{this.state.name[i]}</span>
                </p>
            );

            document.getElementsByClassName('player')[i].style.display = 'block';
        }            


        let turn = 0;
        const step1 = () => {
            window.alert(`${this.state.name[turn]}さんのターンです\nダイスを振ってください`);
            document.getElementsByClassName('dice-btn')[0].style.display = 'block';
        };


        const diceImgs = ['dice1.png','dice2.png','dice3.png','dice4.png','dice5.png','dice6.png'];
        let dice = 0;
        let newSpace = [this.state.space];
        const step2 = () => {
            const diceNam = Math.floor(Math.random() * diceImgs.length);
            const diceBox = document.getElementsByClassName('dice-img');

            diceBox[0].style.backgroundImage = `url(${diceImgs[diceNam]})`;
            dice = diceNam + 1;

            document.getElementById('dice-btn').style.display = 'none';
            document.getElementById('next-turn-btn').style.display = 'block';
        }  


        const spaceBox = document.getElementsByClassName('space');
        const step3 = () => {
            const newVal = newSpace[turn] + dice;
            // newSpace[turn] = newVal;
            // this.setState({
            //     space: newSpace
            // },()=>{
                window.alert(newVal)
            // });
        };




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
                                <button type="button" className="btn" onClick={()=>{start()}}>
                                    start
                                </button>
                            </div>
                            
                        </div>


                        


                        <div id="game-container">

                            <div className="name-box">

                                {nameShow}

                            </div>

                            <div className="dice-content">

                                <button className="btn dice-btn" id="dice-btn" onClick={()=>{step2()}}>ダイスを振る</button>
                                <button className="btn dice-btn" id="next-turn-btn" onClick={()=>{step3()}}>ターンを進める</button>

                                <div className="dice-img">
                                    
                                </div>

                            </div>

                            <div className="game-space-content">

                                <div className="space-box">
                                    <div className="space">

                                        <div   
                                            className="player" 
                                            id='player1' 
                                            style={{backgroundColor: this.state.color[0]}}>

                                            {this.state.name[0]}

                                        </div>

                                        <div 
                                            className="player" 
                                            id='player2'  
                                            style={{backgroundColor: this.state.color[1]}}>
                                            {this.state.name[1]}
                                        </div>

                                        <div 
                                            className="player" 
                                            id='player3'  
                                            style={{backgroundColor: this.state.color[2]}}>
                                            {this.state.name[2]}
                                        </div>

                                        <div 
                                            className="player" 
                                            id='player4'  
                                            style={{backgroundColor: this.state.color[3]}}>
                                            {this.state.name[3]}
                                        </div>

                                    </div>
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
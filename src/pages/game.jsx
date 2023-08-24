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
            space: [0,0,0,0],
            turn: 0
        }
    }

    componentDidMount(){
        let name = [];
        let color = [];

        const localLen = localStorage.length / 2;
        for (let i=0; i<localLen; i++) {
            name.push(
                localStorage.getItem(`name${i+1}`)
            );
            color.push(
                localStorage.getItem(`color${i+1}`)
            );
        }
        this.setState({
            name: name,
            color: color
        });
    }

    // memo
    // マス目にクラスをつけて、マスごとにどっちに移動するかanimationをつける
    // その人の番のとき、名前等を強調する
    //  最初のspace以外にspace-gameというクラスをつけてspace.lengthに使う

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
            },500)
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

        const step1 = () => {
            window.alert(`${this.state.name[this.state.turn]}さんのターンです\nダイスを振ってください`);
            document.getElementById('next-turn-btn').style.display = 'none';
            document.getElementById('turn-btn').style.display = 'none';
            document.getElementById('dice-btn').style.display = 'block';
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
            document.getElementById('turn-btn').style.display = 'block';
        }  


        const step3 = () => {
            const newVal = newSpace[0][this.state.turn] + dice;
            newSpace[0][this.state.turn] = newVal;
            this.setState({
                space: newSpace[0]
            },()=>{
                const space = document.getElementsByClassName('space-game');
                if (space.length <= this.state.space[this.state.turn]) {
                    window.alert(`${this.state.name[this.state.turn]}さんがゴールしました!!\nおめでとう!!`);
                } else {
                    const nowSpace = document.getElementById(`space${this.state.space[this.state.turn]}`)
                    nowSpace.style.backgroundColor = this.state.color[this.state.turn];
                }
            });

            document.getElementById('turn-btn').style.display = 'none';
            document.getElementById('next-turn-btn').style.display = 'block';
        };

        const step4 = () => {
            if (this.state.turn < this.state.name.length-1) {
                this.setState({
                    turn: this.state.turn + 1
                },()=>{
                    step1();
                });
            } else {
                this.setState({
                    turn: 0
                },()=>{
                    step1();
                });
            }
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

                                <button className="btn dice-btns" id="dice-btn" onClick={()=>{step2()}}>ダイスを振る</button>
                                <button className="btn dice-btns" id="turn-btn" onClick={()=>{step3()}}>ターンを進める</button>
                                <button className="btn dice-btns" id="next-turn-btn" onClick={()=>{step4()}}>ターン終了</button>

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
                                    <div className="space space-game" id="space1"></div>
                                    <div className="space space-game" id="space2"></div>
                                    <div className="space space-game" id="space3"></div>
                                    <div className="space space-game" id="space4"></div>
                                </div>

                                <div className="space-box right">
                                    <div className="space space-game" id="space5"></div>
                                </div> 

                                <div className="space-box">
                                    <div className="space space-game" id="space10"></div>
                                    <div className="space space-game" id="space9"></div>
                                    <div className="space space-game" id="space8"></div>
                                    <div className="space space-game" id="space7"></div>
                                    <div className="space space-game" id="space6"></div>
                                </div>

                                <div className="space-box left">
                                    <div className="space space-game" id="space11"></div>
                                </div> 

                                <div className="space-box">
                                    <div className="space space-game" id="space12"></div>
                                    <div className="space space-game" id="space13"></div>
                                    <div className="space space-game" id="space14"></div>
                                    <div className="space space-game" id="space15"></div>
                                    <div className="space space-game" id="space16"></div>
                                </div>

                                <div className="space-box right">
                                    <div className="space space-game" id="space17"></div>
                                </div> 

                                <div className="space-box">
                                    <div className="space space-game" id="space21"></div>
                                    <div className="space space-game" id="space20"></div>
                                    <div className="space space-game" id="space19"></div>
                                    <div className="space space-game" id="space18"></div>
                                    <div className="space space-game" id="space17"></div>
                                </div>

                                <div className="space-box left">
                                    <div className="space space-game" id="space22">ゴール</div>
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
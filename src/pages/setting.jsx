import React from "react";
import { Link } from "react-router-dom";

class Setting extends React.Component {

    //stateからローカルストレージに情報入れる方法
    constructor(props){
        super()
        this.state = {
            num: 0,
            member: [],
            color: []
        }
    }

    render(){

        localStorage.clear()
        
        const nameShow = [];
        const colorShow = [];


        //人数をstateにセット 詳しい設定フォームを表示
        const numSubmit = (e) => {
            e.preventDefault();
            
            const numSubmit = e.target.num.value;
            this.setState({
                num: numSubmit
            });

            const settingForm = document.getElementById('setting-form');
            const numSettingForm = document.getElementById('num-setting-form');
            settingForm.style.display = 'block';
            numSettingForm.style.display = 'none';
        }


        //人数に応じてフォームを増やす
        let i = 0;
        while (i < this.state.num) {
            nameShow.push(
                <div className="setting-input">
                    <label>{i+1}.</label><input type="text" key={i} name="member" required />
                </div>
                
            );
            colorShow.push(
                <div className="setting-input">
                    <label>{i+1}.</label>
                    <select key={i} name="color" required>
                        <option value={'#8C7D8E'}>選択してください</option>
                        <option value={'#F56F60'}>あか</option>
                        <option value={'#5DDB69'}>みどり</option>
                        <option value={'#EACB3F'}>きいろ</option>
                        <option value={'#7683F5'}>あお</option>
                    </select>
                </div>
            );

            i++;
        }


        //詳しい設定をstateにセット 確認画面表示
        const settingSubmit = (e) => {
            e.preventDefault();

            let memberBox = [];
            let colorBox = [];

            for(let i=0; i<this.state.num; i++){
                memberBox.push(e.target.member[i].value);
                colorBox.push(e.target.color[i].value);
            }

            document.getElementById('setting-check').style.display = 'grid';
            document.getElementById('setting-form-box').style.display = 'none';

            this.setState({
                member: memberBox,
                color: colorBox
            },()=>{
                const memberName = document.getElementsByClassName('member-color');
                for(let i=0; i<this.state.num; i++){
                    memberName[i].style.color = this.state.color[i];                    
                }
            });
        }



        //確認画面
        let members = [];

        for(let i=0; i<this.state.num; i++){
            members.push(
                <div>
                    <p className="member-color">{i+1}.{this.state.member[i]}</p>
                </div>
            );
        }


        //ローカルストレージに追加
        const start = () => {
            for(let i=0; i<this.state.num; i++){
                localStorage.setItem(`name${i+1}`, this.state.member[i]);
                localStorage.setItem(`color${i+1}`, this.state.color[i]);
            }
        };

        //stateをリセットしてやり直し
        const reset = () => {
            this.setState({
                num: 0,
                member: [],
                color: []
            });

            location.reload();
        }

        return(
            <div>

                <div className="setting-wrapper" id="setting-form-box">

                    <form onSubmit={numSubmit} id="num-setting-form">

                        <p>何人で遊ぶ？</p>

                        <div className="num-form-box">
                            <div><input type="radio" name="num" value={2} required /><label>2</label></div>
                            <div><input type="radio" name="num" value={3} required /><label>3</label></div>
                            <div><input type="radio" name="num" value={4} required /><label>4</label></div>
                        </div>

                        <div>
                            <input type="submit" className="btn" value={'人数決定'} />
                        </div>

                    </form> 
                    
                    <form onSubmit={settingSubmit} id="setting-form">

                        <div className="input-box">
                            <p>プレイヤー名</p>
                            {nameShow}
                        </div>
                        <div className="input-box">
                            <p>プレイヤーカラー</p>
                            {colorShow}
                        </div>

                        <div>
                            <input type="submit" className="btn" value={'すたーと'} />
                        </div>

                    </form>
                                    

                </div>

                <div id="setting-check">

                    <h2>このメンバーでゲームをはじめますか？</h2>

                    {members}

                    <div className="btn-box">
                        <Link className="btn" onClick={()=>{reset()}}>やりなおし</Link>
                        <Link className="btn" to={'/game'} onClick={()=>{start()}}>はじめる</Link>
                    </div>                 

                </div>

            </div>
        )
    }
}

export default Setting

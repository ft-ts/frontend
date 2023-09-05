"use-client";

import React, { useState, useEffect} from "react";
import styles from "./gameItem.module.scss";
import { paddleDto, ballDto } from "./game.interface";
import { socket } from '../../components/CheckAuth'

export default function Game(
  {
    setMatchFlag,
    setGameFlag,
    setMatchID,
    matchID,
  } :
  {
    setMatchFlag: React.Dispatch<React.SetStateAction<boolean>>
    setGameFlag: React.Dispatch<React.SetStateAction<boolean>>
    setMatchID: React.Dispatch<React.SetStateAction<string>>
    matchID: string
  }
) {
  const [paddleDto, setPaddleDto] = useState<Map<string, paddleDto>>(new Map());
  const [ballDto, setBallDto] = useState<ballDto>({width: 0, height: 0, x: 0, y: 0, type: ''});
  const [count, setCount] = useState(5);
  const [isWin, setIsWin] = useState("");
  const [score, setScore] = useState({me: 0, you: 0});
  const [scorePos, setScorePos] = useState({me: 0, you: 0});
  const [gameResult, setGameResult] = useState(false);
  const [startFlag, setStartFlag] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count >= 0) {
        setCount(count - 1);
      } else {
        if (!startFlag){
          socket.emit('pong/game/ready', { matchID: matchID });
          setStartFlag(true);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count, startFlag]);


  useEffect(() => {
    socket.on('pong/game/ready', ( data : { player1: paddleDto, player2: paddleDto, ball: ballDto }) => 
    {
      console.log('game ready', data);
      
      setPaddleDto((prev) => new Map(prev.set('me', data.player1)));
      setPaddleDto((prev) => new Map(prev.set('you', data.player2)));
      setBallDto(data.ball);
      setScore({me: data.player1.score, you: data.player2.score})
      const myPos : number = data.player1.x < 200 ? data.player1.x + 100 : data.player1.x - 100;
      const yourPos : number = data.player2.x < 200 ? data.player2.x + 100 : data.player2.x - 100;
      setScorePos({me: myPos, you: yourPos});
      });

      socket.on('pong/game/update', ( data : { player1: paddleDto, player2: paddleDto, ball: ballDto }) =>
      {
        // console.log('game update', data);
        setPaddleDto((prev) => new Map(prev.set('me', data.player1)));
        setPaddleDto((prev) => new Map(prev.set('you', data.player2)));
        setBallDto(data.ball);
        setScore({me: data.player1.score, you: data.player2.score})
      });

      socket.on('pong/game/end', ( payload : {winner: boolean, client1_score: number, client2_score: number }) =>
      {
        if (payload.winner) setIsWin("YOU WIN");
        else setIsWin("YOU LOSE");
        // console.log(payloa
        
        setScore({me: payload.client1_score, you: payload.client2_score});
        setGameResult(true);
      });

    }, [paddleDto, ballDto, isWin, score]);

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        const { key } = e;
        console.log('key', key)
        if (key === 'a' || key === 'A' || key === 'ㅁ') {
          socket.emit('pong/game/keyEvent', {key: 'UP', matchID: matchID});
        } else if (key === 'z' || key === 'Z' || key === 'ㅋ') {
          socket.emit('pong/game/keyEvent', {key: 'DOWN', matchID: matchID});
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return() => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    const handeleBackClick = () => {
      setMatchFlag(false);
      setPaddleDto(new Map());
      setBallDto({width: 0, height: 0, x: 0, y: 0, type: ''});
      setGameResult(false);
      setScore({me: 0, you: 0});
      setScorePos({me: 0, you: 0});
      setIsWin("");
      setMatchID("");
      setGameFlag(false);
      setCount(5);
      setStartFlag(false);
    }

    return (
      <div>
        {(count > 0 && !startFlag) && <div className={styles.countBox}>
          <h2 className={styles.countFont}>{count}</h2>
        </div>}
        {(count <= 0 && !startFlag) && <div className={styles.countBox}>
          <h2 className={styles.countFont}>Start</h2>
        </div>}
        {startFlag && <div>
          <div style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: paddleDto.get('me')?.width,
            height: paddleDto.get('me')?.height,
            left: paddleDto.get('me')?.x,
            top: paddleDto.get('me')?.y,
          }}>
          </div>
          <div style={{
            position: 'absolute',
            backgroundColor: 'red',
            width: paddleDto.get('you')?.width,
            height: paddleDto.get('you')?.height,
            left: paddleDto.get('you')?.x,
            top: paddleDto.get('you')?.y,
          }}>
          </div>
          <div style={{
            position: 'absolute',
            backgroundColor: 'blue',
            width: ballDto.width,
            height: ballDto.height,
            left: ballDto.x,
            top: ballDto.y,
          }}>
          </div>
          <div style={{
            position: 'absolute',
            left: scorePos.me,
          }}>
            <h2 className={styles.resultFont}>{score.me}</h2>
          </div>
          <div style={{
            position: 'absolute',
            left: scorePos.you,
          }}>
            <h2 className={styles.resultFont}>{score.you}</h2>
          </div>
        </div>}
        {gameResult && 
        <div>
          <div className={styles.blinking}>
            <div className={styles.resultBox}>
              <h2 className={styles.resultFont}>{isWin}</h2>
            </div>
          </div>
          <button className={styles.backButton} onClick={handeleBackClick} >
            <h2 className={styles.backFont}>back</h2>
          </button>
        </div>
        }
      </div>
    )
}

import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

// 速度级别配置
const SPEED_LEVELS = [
  { name: '慢速', value: 300, emoji: '🐌' },
  { name: '正常', value: 200, emoji: '🚶' },
  { name: '快速', value: 150, emoji: '🏃' },
  { name: '极速', value: 100, emoji: '🚀' },
  { name: '超音速', value: 70, emoji: '⚡' }
];

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(2); // 默认快速模式 (索引2)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
    };
    return newFood;
  }, []);
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setDirection({ x: 1, y: 0 });
  };

  const changeSpeed = (newSpeedLevel) => {
    setSpeedLevel(newSpeedLevel);
    // 如果游戏正在进行，提示重新开始
    if (gameStarted && !gameOver) {
      const confirmChange = window.confirm('更改速度需要重新开始游戏，确定吗？');
      if (confirmChange) {
        resetGame();
      } else {
        return; // 取消速度更改
      }
    }
  };

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // 检查撞墙
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // 检查撞到自己
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, SPEED_LEVELS[speedLevel].value);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speedLevel]);

  return (
    <div className="snake-game">      <div className="game-header">
        <h3>🐍 贪吃蛇游戏</h3>
        <div className="game-info">
          <span>得分: {score}</span>
          <span>最高分: {localStorage.getItem('snakeHighScore') || 0}</span>
        </div>
        
        {/* 速度控制 */}
        <div className="speed-control">
          <label>游戏速度: {SPEED_LEVELS[speedLevel].emoji} {SPEED_LEVELS[speedLevel].name}</label>
          <div className="speed-buttons">
            {SPEED_LEVELS.map((level, index) => (
              <button
                key={index}
                className={`speed-button ${speedLevel === index ? 'active' : ''}`}
                onClick={() => changeSpeed(index)}
                disabled={gameStarted && !gameOver}
                title={`${level.emoji} ${level.name}`}
              >
                {level.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="game-container">
        <div className="game-canvas" style={{ 
          width: CANVAS_SIZE, 
          height: CANVAS_SIZE,
          position: 'relative',
          border: '2px solid #333',
          backgroundColor: '#f0f0f0'
        }}>
          {/* 渲染蛇 */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === 0 ? 'snake-head' : ''}`}
              style={{
                left: segment.x * GRID_SIZE,
                top: segment.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
                position: 'absolute',
                backgroundColor: index === 0 ? '#2e7d32' : '#4caf50',
                border: '1px solid #1b5e20'
              }}
            />
          ))}
          
          {/* 渲染食物 */}
          <div
            className="food"
            style={{
              left: food.x * GRID_SIZE,
              top: food.y * GRID_SIZE,
              width: GRID_SIZE,
              height: GRID_SIZE,
              position: 'absolute',
              backgroundColor: '#f44336',
              borderRadius: '50%',
              border: '1px solid #d32f2f'
            }}
          />
          
          {/* 游戏结束或开始界面 */}
          {(!gameStarted || gameOver) && (
            <div className="game-overlay">
              {gameOver ? (
                <div className="game-over">
                  <h4>游戏结束!</h4>
                  <p>最终得分: {score}</p>
                  <button onClick={resetGame} className="game-button">
                    重新开始
                  </button>
                </div>
              ) : (
                <div className="game-start">
                  <h4>贪吃蛇游戏</h4>
                  <p>使用方向键控制蛇的移动</p>
                  <button onClick={startGame} className="game-button">
                    开始游戏
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
        <div className="game-controls">
        <p>🎮 使用方向键控制蛇的移动</p>
        <p>🍎 吃掉红色食物得分</p>
        <p>⚠️ 不要撞墙或撞到自己</p>
        <p>⚡ 点击表情符号调整游戏速度</p>
      </div>
    </div>
  );
};

export default SnakeGame;

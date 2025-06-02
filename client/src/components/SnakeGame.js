import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

const GRID_SIZE = 20;

// 画布尺寸配置
const CANVAS_SIZES = [
  { name: '小', value: 400, emoji: '📱' },
  { name: '中', value: 600, emoji: '💻' },
  { name: '大', value: 800, emoji: '🖥️' },
  { name: '超大', value: 1000, emoji: '📺' }
];

// 速度级别配置
const SPEED_LEVELS = [
  { name: '缓慢', value: 1200, emoji: '🐌' },
  { name: '超慢速', value: 800, emoji: '🚲' },
  { name: '慢速', value: 500, emoji: '🚶' },
  { name: '正常', value: 300, emoji: '🏃' },
  { name: '快速', value: 200, emoji: '🚀' },
  { name: '极速', value: 150, emoji: '⚡' },
  { name: '闪电', value: 100, emoji: '⭐' }
];

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);  const [gameStarted, setGameStarted] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(3); // 默认正常模式 (索引3)
  const [canvasSizeIndex, setCanvasSizeIndex] = useState(1); // 默认中等尺寸
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameContainerRef = useRef(null);
  // 获取当前画布尺寸
  const getCurrentCanvasSize = useCallback(() => {
    if (isFullscreen) {
      const maxSize = Math.min(window.innerWidth - 40, window.innerHeight - 200);
      return Math.floor(maxSize / GRID_SIZE) * GRID_SIZE;
    }
    return CANVAS_SIZES[canvasSizeIndex].value;
  }, [isFullscreen, canvasSizeIndex]);

  const CANVAS_SIZE = getCurrentCanvasSize();

  const generateFood = useCallback(() => {
    const currentSize = getCurrentCanvasSize();
    const newFood = {
      x: Math.floor(Math.random() * (currentSize / GRID_SIZE)),
      y: Math.floor(Math.random() * (currentSize / GRID_SIZE))
    };
    return newFood;
  }, [getCurrentCanvasSize]);  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    setIsPaused(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPaused(false);
    setDirection({ x: 1, y: 0 });
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  // 游戏结束时更新最高分
  useEffect(() => {
    if (gameOver && score > 0) {
      const currentHighScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
      if (score > currentHighScore) {
        localStorage.setItem('snakeHighScore', score.toString());
      }
    }
  }, [gameOver, score]);
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

  const changeCanvasSize = (newSizeIndex) => {
    setCanvasSizeIndex(newSizeIndex);
    // 如果游戏正在进行，提示重新开始
    if (gameStarted && !gameOver) {
      const confirmChange = window.confirm('更改画布大小需要重新开始游戏，确定吗？');
      if (confirmChange) {
        resetGame();
      } else {
        return; // 取消尺寸更改
      }
    } else {
      resetGame(); // 自动重置游戏位置
    }
  };

  // 全屏切换功能
  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      // 进入全屏
      try {
        const element = gameContainerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch (error) {
        console.log('无法进入全屏模式:', error);
        // 如果无法使用浏览器全屏API，使用CSS全屏效果
        setIsFullscreen(true);
      }
    } else {
      // 退出全屏
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      } catch (error) {
        console.log('无法退出全屏模式:', error);
        setIsFullscreen(false);
      }
    }
    
    // 重新开始游戏以适应新尺寸
    if (gameStarted && !gameOver) {
      const confirmChange = window.confirm('切换全屏模式需要重新开始游戏，确定吗？');
      if (confirmChange) {
        setTimeout(resetGame, 100); // 延迟重置以确保尺寸更新
      }
    } else {
      setTimeout(resetGame, 100);
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      
      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
        setTimeout(resetGame, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      const currentCanvasSize = getCurrentCanvasSize();
      
      // 检查撞墙
      if (head.x < 0 || head.x >= currentCanvasSize / GRID_SIZE || 
          head.y < 0 || head.y >= currentCanvasSize / GRID_SIZE) {
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
  }, [direction, food, gameOver, gameStarted, isPaused, generateFood, getCurrentCanvasSize]);  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0 && !isPaused) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0 && !isPaused) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0 && !isPaused) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0 && !isPaused) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
        case 'Space':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, isPaused]);

  // 触摸控制
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!gameStarted) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      const minSwipeDistance = 30;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0 && direction.x === 0) {
            setDirection({ x: 1, y: 0 }); // 右
          } else if (deltaX < 0 && direction.x === 0) {
            setDirection({ x: -1, y: 0 }); // 左
          }
        }
      } else {
        // 垂直滑动
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0 && direction.y === 0) {
            setDirection({ x: 0, y: 1 }); // 下
          } else if (deltaY < 0 && direction.y === 0) {
            setDirection({ x: 0, y: -1 }); // 上
          }
        }
      }
    };

    const gameCanvas = document.querySelector('.game-canvas');
    if (gameCanvas) {
      gameCanvas.addEventListener('touchstart', handleTouchStart);
      gameCanvas.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        gameCanvas.removeEventListener('touchstart', handleTouchStart);
        gameCanvas.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [direction, gameStarted]);
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, SPEED_LEVELS[speedLevel].value);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speedLevel]);
  return (
    <div 
      className={`snake-game ${isFullscreen ? 'fullscreen' : ''}`}
      ref={gameContainerRef}
    >
      <div className="game-header">
        <h3>🐍 贪吃蛇游戏</h3>        <div className="game-info">
          <span>得分: {score}</span>
          <span>最高分: {localStorage.getItem('snakeHighScore') || 0}</span>
          {gameStarted && !gameOver && (
            <button 
              className="pause-button"
              onClick={togglePause}
              title={isPaused ? '继续游戏 (空格键)' : '暂停游戏 (空格键)'}
            >
              {isPaused ? '▶️ 继续' : '⏸️ 暂停'}
            </button>
          )}
        </div>
        
        {/* 游戏控制面板 */}
        <div className="game-controls-panel">
          {/* 画布尺寸控制 */}
          {!isFullscreen && (
            <div className="size-control">
              <label>画布大小: {CANVAS_SIZES[canvasSizeIndex].emoji} {CANVAS_SIZES[canvasSizeIndex].name}</label>
              <div className="size-buttons">
                {CANVAS_SIZES.map((size, index) => (
                  <button
                    key={index}
                    className={`size-button ${canvasSizeIndex === index ? 'active' : ''}`}
                    onClick={() => changeCanvasSize(index)}
                    disabled={gameStarted && !gameOver}
                    title={`${size.emoji} ${size.name} (${size.value}px)`}
                  >
                    {size.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          
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
          
          {/* 全屏控制 */}
          <div className="fullscreen-control">
            <button 
              className="fullscreen-button"
              onClick={toggleFullscreen}
              title={isFullscreen ? '退出全屏' : '进入全屏'}
            >
              {isFullscreen ? '🪟 退出全屏' : '🖥️ 全屏模式'}
            </button>
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
                  {isFullscreen && <p>画布尺寸: {CANVAS_SIZE}px</p>}
                  <button onClick={resetGame} className="game-button">
                    重新开始
                  </button>
                </div>
              ) : (
                <div className="game-start">
                  <h4>贪吃蛇游戏</h4>
                  <p>使用方向键控制蛇的移动</p>
                  {isFullscreen && <p>全屏模式 - 画布尺寸: {CANVAS_SIZE}px</p>}
                  <button onClick={startGame} className="game-button">
                    开始游戏
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* 暂停状态覆盖层 */}
          {gameStarted && !gameOver && isPaused && (
            <div className="game-overlay pause-overlay">
              <div className="game-paused">
                <h4>⏸️ 游戏暂停</h4>
                <p>按空格键或点击继续按钮恢复游戏</p>
                <button onClick={togglePause} className="game-button">
                  ▶️ 继续游戏
                </button>
              </div>
            </div>
          )}
        </div>
      </div>      {!isFullscreen && (
        <div className="game-instructions">
          <p>🎮 使用方向键控制蛇的移动</p>
          <p>📱 触摸屏：在游戏区域滑动控制方向</p>
          <p>🍎 吃掉红色食物得分</p>
          <p>⚠️ 不要撞墙或撞到自己</p>
          <p>📏 点击📱💻🖥️📺调整画布大小</p>
          <p>⚡ 点击表情符号调整游戏速度</p>
          <p>🖥️ 点击全屏模式获得最佳体验</p>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

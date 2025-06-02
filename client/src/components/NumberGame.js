import React, { useState, useEffect } from 'react';
import './NumberGame.css';

// 数字等级配置
const NUMBER_LEVELS = [
  { name: '入门级', range: [1, 3], description: '学习数字1-3' },
  { name: '初级', range: [1, 5], description: '学习数字1-5' },
  { name: '中级', range: [1, 8], description: '学习数字1-8' },
  { name: '高级', range: [1, 10], description: '学习数字1-10' }
];

// 庆祝消息
const CELEBRATION_MESSAGES = [
  '🎉 太棒了！你答对了！',
  '⭐ 你真聪明！',
  '🌟 做得很好！',
  '🎊 继续加油！',
  '✨ 你学会了！',
  '🏆 你是数字小专家！',
  '🎈 真厉害！',
  '🎁 完美答案！'
];

// 物品表情符号（用于计数）
const COUNT_ITEMS = [
  '🍎', '🍌', '🍊', '🍇', '🍓',
  '⭐', '🌟', '💫', '✨', '🌙',
  '🐶', '🐱', '🐰', '🐼', '🐨',
  '🌸', '🌺', '🌻', '🌷', '🌹'
];

const NumberGame = () => {
  const [gameLevel, setGameLevel] = useState(0);
  const [targetNumber, setTargetNumber] = useState(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [streak, setStreak] = useState(0);
  const [gameMode, setGameMode] = useState('count'); // 'count' 或 'number'

  // 生成随机物品
  const generateRandomItems = (count) => {
    const randomItem = COUNT_ITEMS[Math.floor(Math.random() * COUNT_ITEMS.length)];
    return Array(count).fill(randomItem);
  };

  // 生成新的题目
  const generateNewQuestion = () => {
    const level = NUMBER_LEVELS[gameLevel];
    const [min, max] = level.range;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    setTargetNumber(number);
    setDisplayItems(generateRandomItems(number));
  };

  // 开始游戏
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    generateNewQuestion();
  };

  // 重置游戏
  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setStreak(0);
    setTargetNumber(null);
    setDisplayItems([]);
    setShowCelebration(false);
  };

  // 处理数字选择
  const handleNumberClick = (selectedNumber) => {
    if (!gameStarted || targetNumber === null) return;

    if (selectedNumber === targetNumber) {
      // 正确答案
      const newScore = score + 10;
      const newStreak = streak + 1;
      
      setScore(newScore);
      setStreak(newStreak);
      
      // 显示庆祝动画
      const randomMessage = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
      setCelebrationMessage(randomMessage);
      setShowCelebration(true);
      
      // 检查是否可以升级
      if (newStreak >= 5 && gameLevel < NUMBER_LEVELS.length - 1) {
        setTimeout(() => {
          setGameLevel(gameLevel + 1);
          setStreak(0);
          setCelebrationMessage('🎆 恭喜升级！挑战更大的数字！');
        }, 1000);
      }
      
      // 隐藏庆祝动画并生成新题目
      setTimeout(() => {
        setShowCelebration(false);
        generateNewQuestion();
      }, 2000);
      
    } else {
      // 错误答案 - 给予鼓励
      setCelebrationMessage('💪 再数数看！你可以的！');
      setShowCelebration(true);
      setStreak(0);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 1500);
    }
  };

  // 升级到下一个难度
  const levelUp = () => {
    if (gameLevel < NUMBER_LEVELS.length - 1) {
      setGameLevel(gameLevel + 1);
      setStreak(0);
      if (gameStarted) {
        generateNewQuestion();
      }
    }
  };

  // 降级到上一个难度
  const levelDown = () => {
    if (gameLevel > 0) {
      setGameLevel(gameLevel - 1);
      setStreak(0);
      if (gameStarted) {
        generateNewQuestion();
      }
    }
  };

  // 切换游戏模式
  const toggleGameMode = () => {
    setGameMode(gameMode === 'count' ? 'number' : 'count');
    if (gameStarted) {
      generateNewQuestion();
    }
  };

  // 生成数字选项
  const generateNumberOptions = () => {
    const level = NUMBER_LEVELS[gameLevel];
    const [min, max] = level.range;
    const options = [];
    
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    
    return options;
  };

  return (
    <div className="number-game">
      <div className="game-header">
        <h3>🔢 数字认知游戏</h3>
        <div className="game-info">
          <span>得分: {score}</span>
          <span>等级: {NUMBER_LEVELS[gameLevel].name}</span>
          <span>连对: {streak}次</span>
        </div>
      </div>

      {/* 难度控制 */}
      <div className="level-control">
        <button 
          className="level-button"
          onClick={levelDown}
          disabled={gameLevel === 0}
        >
          ⬅️ 简单点
        </button>
        <span className="level-display">
          第{gameLevel + 1}级 - {NUMBER_LEVELS[gameLevel].name}
        </span>
        <button 
          className="level-button"
          onClick={levelUp}
          disabled={gameLevel === NUMBER_LEVELS.length - 1}
        >
          难一点 ➡️
        </button>
      </div>

      {/* 游戏模式切换 */}
      <div className="mode-control">
        <button 
          className={`mode-button ${gameMode === 'count' ? 'active' : ''}`}
          onClick={() => setGameMode('count')}
        >
          🧮 数数模式
        </button>
        <button 
          className={`mode-button ${gameMode === 'number' ? 'active' : ''}`}
          onClick={() => setGameMode('number')}
        >
          🔢 数字模式
        </button>
      </div>

      {!gameStarted ? (
        <div className="game-start-screen">
          <div className="start-content">
            <h4>🎯 游戏规则</h4>
            <p>👀 看看有多少个物品</p>
            <p>🔢 点击对应的数字</p>
            <p>🎉 答对了会有超棒的庆祝！</p>
            <p>🌟 连对5次可以升级哦！</p>
            <button className="start-button" onClick={startGame}>
              🚀 开始游戏
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 题目显示区域 */}
          {targetNumber !== null && (
            <div className="question-display">
              {gameMode === 'count' ? (
                <>
                  <h4>🧮 数一数有多少个：</h4>
                  <div className="items-container">
                    {displayItems.map((item, index) => (
                      <span key={index} className="count-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h4>🔢 这个数字是：</h4>
                  <div className="number-display">
                    <span className="target-number">{targetNumber}</span>
                  </div>
                  <p>请点击相同的数字</p>
                </>
              )}
            </div>
          )}

          {/* 数字选择区域 */}
          <div className="number-options">
            <h4>👆 点击正确的数字：</h4>
            <div className="number-grid">
              {generateNumberOptions().map((number) => (
                <button
                  key={number}
                  className="number-option-button"
                  onClick={() => handleNumberClick(number)}
                >
                  <span className="number-text">{number}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 庆祝动画覆盖层 */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <div className="celebration-animation">
              🎉 ⭐ 🌟 ✨ 🎊
            </div>
            <h3 className="celebration-message">{celebrationMessage}</h3>
            <div className="fireworks">
              🎆 🎇 ✨ 🌟 ⭐
            </div>
          </div>
        </div>
      )}

      {/* 游戏控制按钮 */}
      {gameStarted && (
        <div className="game-controls">
          <button className="control-button" onClick={resetGame}>
            🔄 重新开始
          </button>
          <button className="control-button" onClick={generateNewQuestion}>
            🎲 换个题目
          </button>
        </div>
      )}

      {/* 游戏说明 */}
      <div className="game-instructions">
        <p>🎮 这是专为4岁小朋友设计的数字认知游戏</p>
        <p>🎯 培养数字识别能力和数量概念</p>
        <p>📈 从简单的1-3开始，逐渐增加到1-10</p>
        <p>🏆 连续答对5题可以解锁更大的数字！</p>
      </div>
    </div>
  );
};

export default NumberGame;

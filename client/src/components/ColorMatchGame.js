import React, { useState, useEffect } from 'react';
import './ColorMatchGame.css';

// 颜色配置 - 按难度分级
const COLOR_LEVELS = [
  {
    level: 1,
    name: '初级',
    colors: [
      { name: '红色', value: '#ff4444', emoji: '🔴' },
      { name: '蓝色', value: '#4444ff', emoji: '🔵' },
      { name: '黄色', value: '#ffff44', emoji: '🟡' }
    ]
  },
  {
    level: 2,
    name: '中级',
    colors: [
      { name: '红色', value: '#ff4444', emoji: '🔴' },
      { name: '蓝色', value: '#4444ff', emoji: '🔵' },
      { name: '黄色', value: '#ffff44', emoji: '🟡' },
      { name: '绿色', value: '#44ff44', emoji: '🟢' },
      { name: '紫色', value: '#ff44ff', emoji: '🟣' }
    ]
  },
  {
    level: 3,
    name: '高级',
    colors: [
      { name: '红色', value: '#ff4444', emoji: '🔴' },
      { name: '蓝色', value: '#4444ff', emoji: '🔵' },
      { name: '黄色', value: '#ffff44', emoji: '🟡' },
      { name: '绿色', value: '#44ff44', emoji: '🟢' },
      { name: '紫色', value: '#ff44ff', emoji: '🟣' },
      { name: '橙色', value: '#ff8844', emoji: '🟠' },
      { name: '粉色', value: '#ff88cc', emoji: '🩷' }
    ]
  }
];

// 庆祝消息
const CELEBRATION_MESSAGES = [
  '🎉 太棒了！',
  '⭐ 你真聪明！',
  '🌟 做得很好！',
  '👏 真厉害！',
  '🎊 继续加油！',
  '🏆 你是颜色小专家！'
];

const ColorMatchGame = () => {
  const [gameLevel, setGameLevel] = useState(0); // 当前难度等级
  const [targetColor, setTargetColor] = useState(null); // 目标颜色
  const [score, setScore] = useState(0); // 得分
  const [gameStarted, setGameStarted] = useState(false); // 游戏是否开始
  const [showCelebration, setShowCelebration] = useState(false); // 庆祝动画
  const [celebrationMessage, setCelebrationMessage] = useState(''); // 庆祝消息
  const [streak, setStreak] = useState(0); // 连续正确次数

  // 获取当前等级的颜色
  const getCurrentColors = () => {
    return COLOR_LEVELS[gameLevel].colors;
  };

  // 生成新的目标颜色
  const generateNewTarget = () => {
    const colors = getCurrentColors();
    const randomIndex = Math.floor(Math.random() * colors.length);
    setTargetColor(colors[randomIndex]);
  };

  // 开始游戏
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    generateNewTarget();
  };

  // 重置游戏
  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setStreak(0);
    setTargetColor(null);
    setShowCelebration(false);
  };

  // 处理颜色选择
  const handleColorClick = (selectedColor) => {
    if (!gameStarted || !targetColor) return;

    if (selectedColor.value === targetColor.value) {
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
      if (newStreak >= 5 && gameLevel < COLOR_LEVELS.length - 1) {
        setTimeout(() => {
          setGameLevel(gameLevel + 1);
          setStreak(0);
          setCelebrationMessage('🎆 恭喜升级！更多颜色等着你！');
        }, 1000);
      }
      
      // 隐藏庆祝动画并生成新目标
      setTimeout(() => {
        setShowCelebration(false);
        generateNewTarget();
      }, 2000);
      
    } else {
      // 错误答案 - 给予鼓励
      setCelebrationMessage('💪 再试试看！你可以的！');
      setShowCelebration(true);
      setStreak(0);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 1500);
    }
  };

  // 升级到下一个难度
  const levelUp = () => {
    if (gameLevel < COLOR_LEVELS.length - 1) {
      setGameLevel(gameLevel + 1);
      setStreak(0);
      if (gameStarted) {
        generateNewTarget();
      }
    }
  };

  // 降级到上一个难度
  const levelDown = () => {
    if (gameLevel > 0) {
      setGameLevel(gameLevel - 1);
      setStreak(0);
      if (gameStarted) {
        generateNewTarget();
      }
    }
  };

  return (
    <div className="color-match-game">
      <div className="game-header">
        <h3>🌈 颜色配对游戏</h3>
        <div className="game-info">
          <span>得分: {score}</span>
          <span>等级: {COLOR_LEVELS[gameLevel].name}</span>
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
          第{gameLevel + 1}级 - {COLOR_LEVELS[gameLevel].name}
        </span>
        <button 
          className="level-button"
          onClick={levelUp}
          disabled={gameLevel === COLOR_LEVELS.length - 1}
        >
          难一点 ➡️
        </button>
      </div>

      {!gameStarted ? (
        <div className="game-start-screen">
          <div className="start-content">
            <h4>🎯 游戏规则</h4>
            <p>👀 看看上面显示的目标颜色</p>
            <p>👆 点击下面相同的颜色</p>
            <p>🎉 答对了会有超棒的庆祝！</p>
            <p>🌟 连对5次可以升级哦！</p>
            <button className="start-button" onClick={startGame}>
              🚀 开始游戏
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 目标颜色显示 */}
          {targetColor && (
            <div className="target-display">
              <h4>🎯 找找这个颜色：</h4>
              <div className="target-color">
                <div 
                  className="color-circle large"
                  style={{ backgroundColor: targetColor.value }}
                >
                  {targetColor.emoji}
                </div>
                <p className="color-name">{targetColor.name}</p>
              </div>
            </div>
          )}

          {/* 颜色选择区域 */}
          <div className="color-options">
            <h4>👆 点击相同的颜色：</h4>
            <div className="color-grid">
              {getCurrentColors().map((color, index) => (
                <button
                  key={index}
                  className="color-option-button"
                  onClick={() => handleColorClick(color)}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="color-emoji">{color.emoji}</span>
                  <span className="color-label">{color.name}</span>
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
          <button className="control-button" onClick={generateNewTarget}>
            🎲 换个颜色
          </button>
        </div>
      )}

      {/* 游戏说明 */}
      <div className="game-instructions">
        <p>🎮 这是专为4岁小朋友设计的颜色认知游戏</p>
        <p>🎯 培养颜色识别能力和手眼协调能力</p>
        <p>📈 从简单的3种颜色开始，逐渐增加难度</p>
        <p>🏆 连续答对5题可以解锁更多颜色！</p>
      </div>
    </div>
  );
};

export default ColorMatchGame;
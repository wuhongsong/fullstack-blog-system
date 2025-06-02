import React, { useState, useEffect } from 'react';
import './AnimalGame.css';

// 动物数据配置
const ANIMAL_LEVELS = [
  {
    name: '入门级',
    description: '认识基本动物',
    animals: [
      { name: '狗狗', emoji: '🐶', sound: '汪汪', color: '#8D6E63' },
      { name: '小猫', emoji: '🐱', sound: '喵喵', color: '#FF7043' },
      { name: '小鸟', emoji: '🐦', sound: '叽叽', color: '#42A5F5' }
    ]
  },
  {
    name: '初级',
    description: '更多可爱动物',
    animals: [
      { name: '狗狗', emoji: '🐶', sound: '汪汪', color: '#8D6E63' },
      { name: '小猫', emoji: '🐱', sound: '喵喵', color: '#FF7043' },
      { name: '小鸟', emoji: '🐦', sound: '叽叽', color: '#42A5F5' },
      { name: '小兔', emoji: '🐰', sound: '咕咕', color: '#E91E63' },
      { name: '小牛', emoji: '🐄', sound: '哞哞', color: '#795548' }
    ]
  },
  {
    name: '中级',
    description: '野生动物朋友',
    animals: [
      { name: '狗狗', emoji: '🐶', sound: '汪汪', color: '#8D6E63' },
      { name: '小猫', emoji: '🐱', sound: '喵喵', color: '#FF7043' },
      { name: '小鸟', emoji: '🐦', sound: '叽叽', color: '#42A5F5' },
      { name: '小兔', emoji: '🐰', sound: '咕咕', color: '#E91E63' },
      { name: '小牛', emoji: '🐄', sound: '哞哞', color: '#795548' },
      { name: '大象', emoji: '🐘', sound: '吼吼', color: '#757575' },
      { name: '狮子', emoji: '🦁', sound: '吼吼', color: '#FFA726' }
    ]
  },
  {
    name: '高级',
    description: '动物王国大冒险',
    animals: [
      { name: '狗狗', emoji: '🐶', sound: '汪汪', color: '#8D6E63' },
      { name: '小猫', emoji: '🐱', sound: '喵喵', color: '#FF7043' },
      { name: '小鸟', emoji: '🐦', sound: '叽叽', color: '#42A5F5' },
      { name: '小兔', emoji: '🐰', sound: '咕咕', color: '#E91E63' },
      { name: '小牛', emoji: '🐄', sound: '哞哞', color: '#795548' },
      { name: '大象', emoji: '🐘', sound: '吼吼', color: '#757575' },
      { name: '狮子', emoji: '🦁', sound: '吼吼', color: '#FFA726' },
      { name: '熊猫', emoji: '🐼', sound: '嗯嗯', color: '#424242' },
      { name: '企鹅', emoji: '🐧', sound: '咕咕', color: '#263238' },
      { name: '猴子', emoji: '🐵', sound: '吱吱', color: '#8D6E63' }
    ]
  }
];

// 庆祝消息
const CELEBRATION_MESSAGES = [
  '🎉 太棒了！你认识这个动物！',
  '⭐ 你真是动物小专家！',
  '🌟 做得很好！',
  '🎊 继续加油！',
  '✨ 你学会了！',
  '🏆 你是动物王国的朋友！',
  '🎈 真厉害！',
  '🎁 完美答案！'
];

const AnimalGame = () => {
  const [gameLevel, setGameLevel] = useState(0);
  const [targetAnimal, setTargetAnimal] = useState(null);
  const [gameOptions, setGameOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [streak, setStreak] = useState(0);
  const [gameMode, setGameMode] = useState('sound'); // 'sound', 'name', 'emoji'
  const [showSound, setShowSound] = useState(false);

  // 获取当前等级的动物
  const getCurrentAnimals = () => {
    return ANIMAL_LEVELS[gameLevel].animals;
  };

  // 生成游戏选项
  const generateGameOptions = (target) => {
    const animals = getCurrentAnimals();
    const options = [target];
    
    // 随机选择其他选项
    while (options.length < Math.min(4, animals.length)) {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      if (!options.find(opt => opt.name === randomAnimal.name)) {
        options.push(randomAnimal);
      }
    }
    
    // 打乱顺序
    return options.sort(() => Math.random() - 0.5);
  };

  // 生成新的题目
  const generateNewQuestion = () => {
    const animals = getCurrentAnimals();
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    
    setTargetAnimal(randomAnimal);
    setGameOptions(generateGameOptions(randomAnimal));
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
    setTargetAnimal(null);
    setGameOptions([]);
    setShowCelebration(false);
    setShowSound(false);
  };

  // 播放动物叫声（模拟）
  const playAnimalSound = (animal) => {
    setShowSound(true);
    setTimeout(() => {
      setShowSound(false);
    }, 2000);
  };

  // 处理动物选择
  const handleAnimalClick = (selectedAnimal) => {
    if (!gameStarted || !targetAnimal) return;

    if (selectedAnimal.name === targetAnimal.name) {
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
      if (newStreak >= 5 && gameLevel < ANIMAL_LEVELS.length - 1) {
        setTimeout(() => {
          setGameLevel(gameLevel + 1);
          setStreak(0);
          setCelebrationMessage('🎆 恭喜升级！认识更多动物朋友！');
        }, 1000);
      }
      
      // 隐藏庆祝动画并生成新题目
      setTimeout(() => {
        setShowCelebration(false);
        generateNewQuestion();
      }, 2000);
      
    } else {
      // 错误答案 - 给予鼓励
      setCelebrationMessage('💪 再想想看！你可以的！');
      setShowCelebration(true);
      setStreak(0);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 1500);
    }
  };

  // 升级到下一个难度
  const levelUp = () => {
    if (gameLevel < ANIMAL_LEVELS.length - 1) {
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

  return (
    <div className="animal-game">
      <div className="game-header">
        <h3>🐻 动物认知游戏</h3>
        <div className="game-info">
          <span>得分: {score}</span>
          <span>等级: {ANIMAL_LEVELS[gameLevel].name}</span>
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
          第{gameLevel + 1}级 - {ANIMAL_LEVELS[gameLevel].name}
        </span>
        <button 
          className="level-button"
          onClick={levelUp}
          disabled={gameLevel === ANIMAL_LEVELS.length - 1}
        >
          难一点 ➡️
        </button>
      </div>

      {/* 游戏模式切换 */}
      <div className="mode-control">
        <button 
          className={`mode-button ${gameMode === 'sound' ? 'active' : ''}`}
          onClick={() => setGameMode('sound')}
        >
          🔊 听声音
        </button>
        <button 
          className={`mode-button ${gameMode === 'name' ? 'active' : ''}`}
          onClick={() => setGameMode('name')}
        >
          📝 看名字
        </button>
        <button 
          className={`mode-button ${gameMode === 'emoji' ? 'active' : ''}`}
          onClick={() => setGameMode('emoji')}
        >
          🐾 找动物
        </button>
      </div>

      {!gameStarted ? (
        <div className="game-start-screen">
          <div className="start-content">
            <h4>🎯 游戏规则</h4>
            <p>🔊 听动物的叫声或看提示</p>
            <p>👆 点击对应的动物</p>
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
          {targetAnimal && (
            <div className="question-display">
              {gameMode === 'sound' && (
                <>
                  <h4>🔊 听一听，这是什么动物？</h4>
                  <div className="sound-display">
                    <button 
                      className="sound-button"
                      onClick={() => playAnimalSound(targetAnimal)}
                    >
                      <span className="sound-icon">🔊</span>
                      <span className="sound-text">
                        {showSound ? `"${targetAnimal.sound}"` : '点击听声音'}
                      </span>
                    </button>
                  </div>
                </>
              )}
              
              {gameMode === 'name' && (
                <>
                  <h4>📝 找一找这个动物：</h4>
                  <div className="name-display">
                    <span className="target-name">{targetAnimal.name}</span>
                  </div>
                </>
              )}
              
              {gameMode === 'emoji' && (
                <>
                  <h4>🐾 找到这个动物：</h4>
                  <div className="emoji-display">
                    <span className="target-emoji">{targetAnimal.emoji}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 动物选择区域 */}
          <div className="animal-options">
            <h4>👆 点击正确的动物：</h4>
            <div className="animal-grid">
              {gameOptions.map((animal, index) => (
                <button
                  key={index}
                  className="animal-option-button"
                  onClick={() => handleAnimalClick(animal)}
                  style={{ borderColor: animal.color }}
                >
                  <span className="animal-emoji">{animal.emoji}</span>
                  <span className="animal-name">{animal.name}</span>
                  <span className="animal-sound">"{animal.sound}"</span>
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
            🎲 换个动物
          </button>
          {targetAnimal && (
            <button 
              className="control-button sound-control"
              onClick={() => playAnimalSound(targetAnimal)}
            >
              🔊 重听声音
            </button>
          )}
        </div>
      )}

      {/* 游戏说明 */}
      <div className="game-instructions">
        <p>🎮 这是专为4岁小朋友设计的动物认知游戏</p>
        <p>🎯 培养动物识别能力和听觉训练</p>
        <p>📈 从基本动物开始，逐渐认识更多朋友</p>
        <p>🏆 连续答对5题可以解锁更多动物！</p>
      </div>
    </div>
  );
};

export default AnimalGame;

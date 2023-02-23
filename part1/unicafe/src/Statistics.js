import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
  const setAverageScore = () => {
    if (!good && !bad && !neutral) return 0;
    return (good - bad) / (good + bad + neutral);
  };
  const setPositiveScore = () => {
    if (!good && !bad && !neutral) return 0;
    return (good / (good + bad + neutral)) * 100;
  };

  if (!good && !bad && !neutral) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine label="Good" value={good} />
          <StatisticsLine label="Neutral" value={neutral} />
          <StatisticsLine label="Bad" value={bad} />
          <StatisticsLine label="All" value={good + bad + neutral} />
          <StatisticsLine label="Average" value={setAverageScore()} />
          <StatisticsLine label="Positive" value={`${setPositiveScore()}%`} />
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;

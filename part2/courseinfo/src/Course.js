import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => (sum += part.exercises), 0)} />
    </div>
  );
};
export default Course;

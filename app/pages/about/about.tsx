import ButtonComponent from "~/components/Button";
import "./about.scss";

export default function About() {
  return (
    <>
      <h1 className="about-header testcss">About page</h1>

      <ButtonComponent buttonText="World" />

      <ButtonComponent buttonText="World">
        <p>Hello from P</p>
      </ButtonComponent>

      <div className="container">
        <ul>
          <li>List 1</li>
          <li>List 2</li>
          <li>List 3</li>
        </ul>

        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, nulla dignissimos minus aspernatur sed similique molestias mollitia laudantium? Non, <span className="span-text">snflkdsfnksl</span>cumque!
        </p>
      </div>
    </>
  );
}

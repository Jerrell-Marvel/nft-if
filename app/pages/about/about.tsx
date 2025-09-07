import ButtonComponent from "~/components/Button";
import "./about.scss";

export default function About() {
  return (
    <>
      <h1 className="about-header">About page</h1>

      <ButtonComponent buttonText="World" />

      <ButtonComponent buttonText="World">
        <p>Hello from P</p>
      </ButtonComponent>
    </>
  );
}

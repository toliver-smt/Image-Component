import Display from "./layout/Display";
export default function Root(props) {

  return (
    <section>
      {props.name} is mounted!
      <hr/>
      <Display />
    </section>
  )
}

import { useState } from 'react'

function App() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("typing");
  const [err, setErr] = useState("");

  if (status === "success") return <h1 className='guess-right'>That's right!</h1>;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch(err) {
      setStatus("typing");
      setErr(err);
    }
  }

  return (
    <>
    <div className='container'>
      <h1>City quiz</h1>
      <p>In which city has the Empire State Building?</p>
      <form onSubmit={handleSubmit}>
        <textarea 
        placeholder='Enter city here'
        onChange={(e)=>setAnswer(e.target.value.toUpperCase())}
        value={answer}
        disabled={status === "submitting"} />
        <button 
          className='btn'
          disabled={
            answer.length === 0 ||
            status === "submitting"
          }>
          Submit
        </button>
        {
        err !== null && 
        <p className='error'>
          {err.message}
        </p>
        }
      </form>
    </div>
    </>
  )
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      let shouldError = answer !== "NY" && answer !== "NEW YORK";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again"));
      } else {
        resolve();
      }
    }, 2000);
  });
}

export default App

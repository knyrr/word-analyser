
export const WordCell = ({ onSelectWord, sendWord, sendCount }) => {
  return (
    <>
    <span onClick={(e) => onSelectWord(e.target.textContent)}>{sendWord}</span> ({sendCount})&nbsp;
    </>
  )
}
